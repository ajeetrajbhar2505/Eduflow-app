// src/app/features/workspace/students/students.component.ts
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
export class StudentsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  // Signals for reactive state
  isJoined = signal<boolean>(false);
  roomInfo = signal<RoomInfo | null>(null);
  messages = signal<Message[]>([]);
  remoteStream = signal<MediaStream | null>(null);
  isRecording = signal<boolean>(false);
  handRaised = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  isAudioMuted = signal<boolean>(false);
  viewerCount = signal<number>(1248);
  
  // Tab state
  tabFlags = signal({
    overView: true,
    chats: false
  });
  
  // Computed signals
  messageCount = computed(() => this.messages().length);
  canRaiseHand = computed(() => this.isJoined() && !this.handRaised() && !this.isLoading());
  lectureTitle = computed(() => {
    const info = this.roomInfo();
    return info ? info.subject : 'Advanced Quantum Mechanics';
  });
  teacherName = computed(() => {
    const info = this.roomInfo();
    return info ? info.teacherName : 'Dr. Elena Kostic';
  });
  liveViewers = computed(() => {
    const info = this.roomInfo();
    return info?.studentCount || this.viewerCount();
  });
  isLive = computed(() => this.isJoined() && !this.isLoading());
  
  // Typing indicator
  isTyping = signal<boolean>(false);
  typingTimeout: any;
  
  private subscriptions = new Subscription();
  
  // Modern injection
  private fb = inject(FormBuilder);
  private socketService = inject(SocketService);
  private webRTCService = inject(WebRTCService);
  
  // Join form
  joinForm: FormGroup;

  constructor() {
    this.joinForm = this.fb.group({
      roomId: ['', Validators.required],
      studentName: ['', Validators.required]
    });
    
    // Set up effects
    effect(() => {
      if (this.isJoined()) {
        console.log('Student joined lecture:', this.roomInfo());
      }
    });
  }

  ngOnInit() {
    this.initializeSocketListeners();
    this.initializeWebRTCListeners();
  }

  ngAfterViewInit() {
    // Subscribe to remote stream to update video element
    effect(() => {
      const stream = this.remoteStream();
      if (stream && this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
      }
    });
  }

  private initializeSocketListeners() {
    this.subscriptions.add(
      this.socketService.onRoomInfo().subscribe((info: RoomInfo) => {
        this.roomInfo.set(info);
        this.isJoined.set(true);
        this.isLoading.set(false);
        
        // Add system message when joining
        this.messages.update(prev => [...prev, {
          userId: Date.now().toString(),
          message: 'Joined the live session',
          userName: 'System',
          role: 'system',
          timestamp: new Date()
        }]);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onNewMessage().subscribe((message: Message) => {
        this.messages.update(prevMessages => [...prevMessages, message]);
        
        // Auto-scroll to bottom of chat
        setTimeout(() => this.scrollToBottom(), 100);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onRecordingStatus().subscribe((data: { isRecording: boolean }) => {
        this.isRecording.set(data.isRecording);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onLectureEnded().subscribe(() => {
        this.showNotification('Lecture has ended', 'info');
        this.leaveLecture();
      })
    );
    
    this.subscriptions.add(
      this.socketService.onError().subscribe((error: { message: string }) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        setTimeout(() => this.error.set(null), 5000);
      })
    );
    
    this.subscriptions.add(
      this.socketService.onHandRaised().subscribe((data: { studentName: string }) => {
        // Handle hand raised acknowledgment
        this.showNotification(`${data.studentName} raised hand`, 'info');
      })
    );
    
    this.subscriptions.add(
      this.socketService.onTyping().subscribe((data: { studentName: string, isTyping: boolean }) => {
        // Handle typing indicators from other users
        if (data.studentName !== this.joinForm.get('studentName')?.value) {
          // You can implement typing indicator UI here
          console.log(`${data.studentName} is ${data.isTyping ? 'typing...' : 'stopped typing'}`);
        }
      })
    );
  }

  private initializeWebRTCListeners() {
    this.subscriptions.add(
      this.socketService.onOffer().subscribe(async (data: any) => {
        try {
          this.isLoading.set(true);
          const peerConnection = await this.webRTCService.createPeerConnection();
          
          peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
              this.socketService.sendIceCandidate(data.from, event.candidate);
            }
          };
          
          peerConnection.ontrack = (event: RTCTrackEvent) => {
            this.remoteStream.set(event.streams[0]);
          };
          
          await this.webRTCService.setRemoteDescription(peerConnection, data.sdp);
          const answer = await this.webRTCService.createAnswer(peerConnection);
          this.socketService.sendAnswer(data.from, answer);
          this.isLoading.set(false);
        } catch (error) {
          console.error('Error handling offer:', error);
          this.error.set('Failed to establish connection');
          this.isLoading.set(false);
        }
      })
    );
    
    this.subscriptions.add(
      this.socketService.onIceCandidate().subscribe(async (data: any) => {
        try {
          if (this.webRTCService['peerConnection']) {
            await this.webRTCService.addIceCandidate(
              this.webRTCService['peerConnection'],
              data.candidate
            );
          }
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      })
    );
    
    // Subscribe to remote stream from WebRTC service
    this.subscriptions.add(
      this.webRTCService.remoteStream$.subscribe((stream: MediaStream | null) => {
        this.remoteStream.set(stream);
      })
    );
  }

  joinLecture() {
    if (this.joinForm.valid) {
      this.isLoading.set(true);
      this.error.set(null);
      
      this.socketService.joinRoom(
        this.joinForm.value.roomId,
        this.joinForm.value.studentName
      ).subscribe({
        next: (response: JoinResponse) => {
          if (!response.success) {
            this.error.set(response.message || 'Failed to join lecture');
            this.isLoading.set(false);
          }
        },
        error: (err: any) => {
          console.error('Join error:', err);
          this.error.set('Failed to join lecture. Please try again.');
          this.isLoading.set(false);
        }
      });
    }
  }

  sendMessage(message: string) {
    if (message.trim() && this.isJoined()) {
      this.socketService.sendMessage(message);
      this.clearTyping();
    }
  }

  raiseHand() {
    if (this.canRaiseHand()) {
      this.socketService.raiseHand();
      this.handRaised.set(true);
      
      // Show local notification
      this.showNotification('Hand raised! Teacher will acknowledge you soon.', 'success');
      
      // Auto lower hand after 30 seconds
      setTimeout(() => {
        if (this.handRaised()) {
          this.lowerHand();
        }
      }, 30000);
    }
  }

  lowerHand() {
    if (this.handRaised()) {
      this.socketService.lowerHand();
      this.handRaised.set(false);
    }
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

  onTyping() {
    if (!this.isTyping() && this.isJoined()) {
      this.isTyping.set(true);
      this.socketService.sendTyping(true);
    }
    
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    this.typingTimeout = setTimeout(() => {
      this.clearTyping();
    }, 1000);
  }

  clearTyping() {
    if (this.isTyping()) {
      this.isTyping.set(false);
      this.socketService.sendTyping(false);
    }
  }

  leaveLecture() {
    this.isJoined.set(false);
    this.roomInfo.set(null);
    this.messages.set([]);
    this.remoteStream.set(null);
    this.handRaised.set(false);
    this.isRecording.set(false);
    this.isTyping.set(false);
    
    this.tabFlags.set({
      overView: true,
      chats: false
    });
    
    this.webRTCService.closeConnection();
    this.socketService.disconnect();
    this.joinForm.reset();
  }

  private scrollToBottom() {
    const chatContainer = document.querySelector('.chat-messages-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info') {
    // Implement toast notification here
    console.log(`[${type}] ${message}`);
    
    // Simple alert for now (replace with proper toast service)
    if (type === 'error') {
      alert(message);
    }
  }

  // Add these methods inside your StudentsComponent class

/**
 * Toggle audio mute/unmute for the video stream
 */
toggleAudio() {
  if (this.videoElement?.nativeElement) {
    const video = this.videoElement.nativeElement;
    if (video.muted) {
      video.muted = false;
      this.isAudioMuted.set(false);
      this.showNotification('Audio unmuted', 'info');
    } else {
      video.muted = true;
      this.isAudioMuted.set(true);
      this.showNotification('Audio muted', 'info');
    }
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.webRTCService.closeConnection();
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}