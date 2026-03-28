import { Component, OnInit, OnDestroy, inject, signal, computed, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
      studentName: ['Pradeep', Validators.required]
    });

  }

  async ngOnInit() {
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

    this.subscriptions.add(
      this.socketService.onOffer().subscribe(async ({ from, sdp }) => {
        console.log('✅ Offer received');

        const pc = await this.webRTCService.createPeerConnection();


        // 🔥 Assign ontrack before setRemoteDescription
        pc.ontrack = (event) => {
          const video = this.videoElement?.nativeElement;
          if (video && video.srcObject !== event.streams[0]) {
            video.srcObject = event.streams[0];
            video.onloadedmetadata = () => video.play().catch(console.error);
          }
        };

        // Set remote description
        await this.webRTCService.setRemoteDescription(pc, sdp);
        this.isRemoteSet = true;

        this.peerConnection = pc;
        this.peerConnection.oniceconnectionstatechange = () => {
          console.log('ICE STATE:', this.peerConnection.iceConnectionState);
        };

        // ✅ SET REMOTE
        await this.webRTCService.setRemoteDescription(pc, sdp);
        this.isRemoteSet = true;

        // ✅ FLUSH ICE
        for (const candidate of this.iceQueue) {
          await pc.addIceCandidate(candidate);
        }
        this.iceQueue = [];

        // ✅ CREATE ANSWER
        const answer = await this.webRTCService.createAnswer(pc);
        this.socketService.sendAnswer(from, answer);

        console.log('✅ Answer sent');

        // ✅ ICE
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            this.socketService.sendIceCandidate(from, event.candidate);
          }
        };

        console.log('pc.ontrack assigned:', !!pc.ontrack); // should be true
      })
    );
    // ✅ ICE HANDLING (FIXED)
    this.subscriptions.add(
      this.socketService.onIceCandidate().subscribe(async ({ candidate }) => {
        if (!this.peerConnection) return;

        try {
          if (!this.isRemoteSet) {
            this.iceQueue.push(candidate);
          } else {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
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