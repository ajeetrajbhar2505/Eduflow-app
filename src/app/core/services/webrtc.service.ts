import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  
  public remoteStream$ = new Subject<MediaStream>();
  public localStream$ = new Subject<MediaStream>();

  constructor() {}

  async initializeLocalStream(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      this.localStream$.next(this.localStream);
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  async createPeerConnection(configuration?: RTCConfiguration): Promise<RTCPeerConnection> {
    const defaultConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    
    this.peerConnection = new RTCPeerConnection(configuration || defaultConfig);
    
    this.peerConnection.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        this.remoteStream$.next(event.streams[0]);
      }
    };
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    }
    
    return this.peerConnection;
  }

  async createOffer(peerConnection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(peerConnection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(peerConnection: RTCPeerConnection, description: RTCSessionDescriptionInit): Promise<void> {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
  }

  async addIceCandidate(peerConnection: RTCPeerConnection, candidate: RTCIceCandidateInit): Promise<void> {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  closeConnection(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }
}