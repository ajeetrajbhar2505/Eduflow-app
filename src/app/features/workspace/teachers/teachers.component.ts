import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandRaise, Message } from 'src/app/core/models/lecture.model';
import { SocketService } from 'src/app/core/services/socket.service';
import { WebRTCService } from 'src/app/core/services/webrtc.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class TeachersComponent implements OnInit, OnDestroy {

  videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement')
  set set(video: ElementRef<HTMLVideoElement>) {
    this.videoElement = video;
    if (video && this.localStream) {
      video.nativeElement.srcObject = this.localStream;
    }
  }
  lectureForm: FormGroup;
  roomId: string = '';
  isLectureStarted = false;
  isRecording = false;
  micEnabled = true;
  videoEnabled = true;
  students: any[] = [];
  messages: Message[] = [];
  raisedHands: HandRaise[] = [];

  localStream: any;

  // 🔥 FIX: Multiple peer connections
  peerConnections: Map<string, RTCPeerConnection> = new Map();

  private subscriptions = new Subscription();

  // UI state
  tabFlags = signal({
    overView: true,
    chats: false
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketService: SocketService,
    private webRTCService: WebRTCService
  ) {
    this.lectureForm = this.fb.group({
      teacherName: ['Ajit Rajbhar', Validators.required],
      subject: ['Biology', Validators.required]
    });
  }


  async ngOnInit() {
    // ✅ Get camera + mic
    try {
      this.localStream = await this.webRTCService.initializeLocalStream();

      if (!this.localStream) {
        throw new Error('Stream not available');
      }

      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.localStream;
      }

    } catch (error) {
      console.error('Media access error:', error);
      return; // ❌ STOP if no stream
    }
    // बाकी code same

    // ✅ Room created
    this.subscriptions.add(
      this.socketService.onRoomCreated().subscribe(data => {
        this.roomId = data.roomId;
      })
    );

    // ✅ Student joined
    this.subscriptions.add(
      this.socketService.onStudentJoined().subscribe(student => {
        this.students.push(student);
        this.initiatePeerConnection(student.id);
      })
    );

    // ✅ Chat
    this.subscriptions.add(
      this.socketService.onNewMessage().subscribe((message: Message) => {
        this.messages.push(message);
      })
    );

    // ✅ Hand raise
    this.subscriptions.add(
      this.socketService.onHandRaised().subscribe((data: HandRaise) => {
        this.raisedHands.push(data);
        setTimeout(() => {
          this.raisedHands = this.raisedHands.filter(h => h.studentId !== data.studentId);
        }, 30000);
      })
    );

    // 🔥 ANSWER HANDLING (FIXED)
    this.subscriptions.add(
      this.socketService.onAnswer().subscribe(async ({ from, sdp }) => {
        const pc = this.peerConnections.get(from);
        if (pc) {
          await this.webRTCService.setRemoteDescription(pc, sdp);
        }
      })
    );

    // 🔥 ICE HANDLING (FIXED)
    this.subscriptions.add(
      this.socketService.onIceCandidate().subscribe(async ({ from, candidate }) => {
        const pc = this.peerConnections.get(from);
        if (pc) {
          await this.webRTCService.addIceCandidate(pc, candidate);
        }
      })
    );
  }

  // 🔥 CORE FIX: Proper peer connection per student
  async initiatePeerConnection(studentId: string) {
    if (this.peerConnections.has(studentId)) return; // جلوگیری duplicate

    const pc = await this.webRTCService.createPeerConnection();

    this.peerConnections.set(studentId, pc);

    // ✅ Add tracks ONLY ONCE

    // ICE
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE →', studentId); // 👈 ADD THIS
        this.socketService.sendIceCandidate(studentId, event.candidate);
      }
    };


    // Create offer
    this.localStream?.getTracks().forEach((track: any) => {
      console.log(track);
      pc.addTrack(track, this.localStream)
    });
    const offer = await this.webRTCService.createOffer(pc);
    await pc.setLocalDescription(offer); // ensure set
    this.socketService.sendOffer(studentId, offer);
  }

  startLecture() {
    if (this.lectureForm.valid) {
      this.socketService.createRoom(
        this.lectureForm.value.teacherName,
        this.lectureForm.value.subject
      ).subscribe(res => {
        if (res.success) {
          this.isLectureStarted = true;
          this.roomId = res.roomId;
        }
      });
    }
  }

  sendMessage(message: string) {
    if (message.trim()) {
      this.socketService.sendMessage(message);
    }
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
  }

  setActiveTab(tab: 'overView' | 'chats') {
    this.tabFlags.update(flags => ({
      overView: tab === 'overView',
      chats: tab === 'chats'
    }));

    if (tab === 'chats') {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }


  copyRoomId() {
    navigator.clipboard.writeText(this.roomId);
    alert('Room ID copied!');
  }

  endLecture() {
    this.isLectureStarted = false;

    // 🔥 close all connections
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();

    this.socketService.disconnect();
    this.router.navigate(['/']);
  }

  private scrollToBottom() {
    const chat = document.querySelector('.chat-messages-container');
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }

  toggleMic() {
    this.micEnabled = !this.micEnabled;
    this.localStream?.getAudioTracks().forEach((track: any) => track.enabled = this.micEnabled);
  }

  toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    this.localStream?.getVideoTracks().forEach((track: any) => track.enabled = this.videoEnabled);
  }


  removePeerConnection(studentId: string) {
    const pc = this.peerConnections.get(studentId);
    if (pc) {
      pc.close();
      this.peerConnections.delete(studentId);
    }
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
  }
}