import { Component, OnInit, OnDestroy, inject, signal, computed, effect, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SocketService } from '../../../core/services/socket.service';
import { WebRTCService } from '../../../core/services/webrtc.service';
import { Subscription } from 'rxjs';
import { JoinResponse, Message, RoomInfo } from 'src/app/core/models/lecture.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  // 🔥 FIX: single peer connection reference
  private peerConnection!: RTCPeerConnection;
  private iceQueue: RTCIceCandidate[] = [];
  private isRemoteSet = false;

  isJoined = signal<boolean>(false);
  roomInfo = signal<RoomInfo | null>(null);
  messages = signal<Message[]>([]);
  remoteStream = signal<MediaStream | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>("");
  isRecording = signal<boolean>(false);
  handRaised = signal<boolean>(false);
  isTyping = signal<boolean>(false);
  viewerCount = signal<number>(1248);

  tabFlags = signal({
    overView: true,
    chats: false
  });

  messageCount = computed(() => this.messages().length);

  lectureTitle = computed(() => {
    const info = this.roomInfo();
    return info ? info.subject : 'Live Lecture';
  });

  teacherName = computed(() => {
    const info = this.roomInfo();
    return info ? info.teacherName : 'Instructor';
  });

  liveViewers = computed(() => {
    const info = this.roomInfo();
    return info?.studentCount || this.viewerCount();
  });


  setActiveTab(tab: 'overView' | 'chats') {
    this.tabFlags.update(flags => ({
      overView: tab === 'overView',
      chats: tab === 'chats'
    }));
  }

  sendMessage(message: string) {
    if (message.trim()) {
      this.socketService.sendMessage(message);
    }
  }

  onTyping() {
    if (!this.isTyping()) {
      this.isTyping.set(true);
      this.socketService.sendTyping(true);
    }

    setTimeout(() => {
      this.isTyping.set(false);
      this.socketService.sendTyping(false);
    }, 1000);
  }

  raiseHand() {
    this.socketService.raiseHand();
    this.handRaised.set(true);
  }


  toggleAudio() {
    const video = this.videoElement?.nativeElement;
    if (!video) return;

    video.muted = !video.muted;
  }

  toggleFullscreen() {
    const video = this.videoElement?.nativeElement;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }

  canRaiseHand = computed(() => this.isJoined() && !this.handRaised());

  private subscriptions = new Subscription();
  localStream: MediaStream | null = null;

  private fb = inject(FormBuilder);
  private socketService = inject(SocketService);
  private webRTCService = inject(WebRTCService);

  joinForm: FormGroup;

  constructor() {
    this.joinForm = this.fb.group({
      roomId: ['', Validators.required],
      studentName: ['', Validators.required]
    });

  }

  async ngOnInit() {
    try {
      this.localStream = await this.webRTCService.initializeLocalStream();
    } catch (err) {
      console.error('Media error:', err);
    }

    this.initializeSocketListeners();
    this.initializeWebRTCListeners();
  }

  private initializeSocketListeners() {
    this.subscriptions.add(
      this.socketService.onRoomInfo().subscribe((info: RoomInfo) => {
        this.roomInfo.set(info);
        this.isJoined.set(true);
        this.isLoading.set(false);
      })
    );

    this.subscriptions.add(
      this.socketService.onError().subscribe((error: { message: string }) => {
        this.error.set(error.message);
        this.isLoading.set(false);
      })
    );
  }

  private initializeWebRTCListeners() {

    // ✅ OFFER HANDLING
    this.subscriptions.add(
      this.socketService.onOffer().subscribe(async ({ from, sdp }) => {

        const pc = await this.webRTCService.createPeerConnection();
        this.peerConnection = pc;

        // ✅ Add tracks safely
        this.localStream?.getTracks().forEach(track => {
          const alreadyAdded = pc.getSenders().some(sender => sender.track === track);
          if (!alreadyAdded) {
            pc.addTrack(track, this.localStream!);
          }
        });

        // ✅ Set remote description
        await this.webRTCService.setRemoteDescription(pc, sdp);

        // ✅ VERY IMPORTANT
        this.isRemoteSet = true;

        // ✅ Flush ICE queue
        for (const candidate of this.iceQueue) {
          await pc.addIceCandidate(candidate);
        }
        this.iceQueue = [];

        // ✅ Create answer
        const answer = await this.webRTCService.createAnswer(pc);
        this.socketService.sendAnswer(from, answer);

        // ICE
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            this.socketService.sendIceCandidate(from, event.candidate);
          }
        };

        // ✅ VIDEO FIX (use ViewChild)
        pc.ontrack = (event) => {
          console.log('✅ TRACK RECEIVED', event);

          const stream = event.streams[0];

          if (this.videoElement?.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
          }
        };
      })


    )

    // ✅ ICE HANDLING (FIXED)
    this.subscriptions.add(
      this.socketService.onIceCandidate().subscribe(async ({ candidate }) => {
        try {
          if (!this.peerConnection) return;

          if (!this.isRemoteSet) {
            this.iceQueue.push(candidate);
          } else {
            await this.peerConnection.addIceCandidate(candidate);
          }
        } catch (err) {
          console.error('ICE error', err);
        }
      })
    );
  }

  joinLecture() {
    if (this.joinForm.valid) {
      this.isLoading.set(true);

      this.socketService.joinRoom(
        this.joinForm.value.roomId,
        this.joinForm.value.studentName
      ).subscribe({
        next: (res: JoinResponse) => {
          if (!res.success) {
            this.error.set(res.message);
            this.isLoading.set(false);
          }
        },
        error: () => {
          this.error.set('Join failed');
          this.isLoading.set(false);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }
}