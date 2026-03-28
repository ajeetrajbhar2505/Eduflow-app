import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandRaise, Message } from 'src/app/core/models/lecture.model';
import { SocketService } from 'src/app/core/services/socket.service';
import { WebRTCService } from 'src/app/core/services/webrtc.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  imports : [ReactiveFormsModule,CommonModule]
})
export class TeachersComponent implements OnInit, OnDestroy {
  lectureForm: FormGroup;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  roomId: string = '';
  isLectureStarted = false;
  isRecording = false;
  students: any[] = [];
  messages: Message[] = [];
  raisedHands: HandRaise[] = [];
  localStream: MediaStream | null = null;
  remoteStreams: Map<string, MediaStream> = new Map();
  

  // Tab state
    tabFlags = signal({
      overView: true,
      chats: false
    });
    


  setActiveTab(tab: 'overView' | 'chats') {
    this.tabFlags.update(flags => ({
      overView: tab === 'overView',
      chats: tab === 'chats'
    }));
    
    if (tab === 'chats') {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }


  /**
 * Toggle fullscreen mode for the video
 */
toggleFullscreen() {
  if (this.videoElement?.nativeElement) {
    const video = this.videoElement.nativeElement;
    
    if (document.fullscreenElement) {
      // Exit fullscreen
      document.exitFullscreen().catch(err => {
        console.error('Error exiting fullscreen:', err);
      });
    } else {
      // Enter fullscreen
      video.requestFullscreen().catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    }
  }
}

   private scrollToBottom() {
    const chatContainer = document.querySelector('.chat-messages-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketService: SocketService,
    private webRTCService: WebRTCService
  ) {
    this.lectureForm = this.fb.group({
      teacherName: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  async ngOnInit() {
    // Initialize local stream
    try {
      this.localStream = await this.webRTCService.initializeLocalStream();
    } catch (error) {
      console.error('Failed to get media devices:', error);
    }
    
    // Socket event listeners
    this.subscriptions.add(
      this.socketService.onRoomCreated().subscribe(data => {
        this.roomId = data.roomId;
        console.log('Room created:', this.roomId);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onStudentJoined().subscribe(student => {
        this.students.push(student);
        this.initiatePeerConnection(student.id);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onNewMessage().subscribe((message: Message) => {
        this.messages.push(message);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onHandRaised().subscribe((data: HandRaise) => {
        this.raisedHands.push(data);
        setTimeout(() => {
          this.raisedHands = this.raisedHands.filter(h => h.studentId !== data.studentId);
        }, 30000);
      })
    );
    
    // WebRTC signaling
    this.subscriptions.add(
      this.socketService.onAnswer().subscribe(async (data) => {
        if (this.webRTCService['peerConnection']) {
          await this.webRTCService.setRemoteDescription(
            this.webRTCService['peerConnection'],
            data.sdp
          );
        }
      })
    );
    
    this.subscriptions.add(
      this.socketService.onIceCandidate().subscribe(async (data) => {
        if (this.webRTCService['peerConnection']) {
          await this.webRTCService.addIceCandidate(
            this.webRTCService['peerConnection'],
            data.candidate
          );
        }
      })
    );
    
    this.webRTCService.remoteStream$.subscribe(stream => {
      if (stream) {
        // Handle remote streams (for student screen sharing if needed)
      }
    });
  }

  startLecture() {
    if (this.lectureForm.valid) {
      this.socketService.createRoom(
        this.lectureForm.value.teacherName,
        this.lectureForm.value.subject
      ).subscribe(response => {
        if (response.success) {
          this.isLectureStarted = true;
          this.roomId = response.roomId;
        }
      });
    }
  }

  async initiatePeerConnection(studentId: string) {
    const peerConnection = await this.webRTCService.createPeerConnection();
    
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketService.sendIceCandidate(studentId, event.candidate);
      }
    };
    
    const offer = await this.webRTCService.createOffer(peerConnection);
    this.socketService.sendOffer(studentId, offer);
  }

  sendMessage(message: string) {
    if (message.trim()) {
      this.socketService.sendMessage(message);
    }
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    this.socketService.toggleRecording(this.isRecording);
  }

  endLecture() {
    this.isLectureStarted = false;
    this.webRTCService.closeConnection();
    this.socketService.disconnect();
    this.router.navigate(['/']);
  }

  copyRoomId() {
    navigator.clipboard.writeText(this.roomId);
    alert('Room ID copied to clipboard!');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.webRTCService.closeConnection();
  }
}