import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebRTCService {

  async initializeLocalStream(): Promise<MediaStream> {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
  }

  createPeerConnection(): RTCPeerConnection {
    return new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' } // 🔥 REQUIRED
      ]
    });
  }

  async createOffer(pc: RTCPeerConnection) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(pc: RTCPeerConnection) {
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(pc: RTCPeerConnection, sdp: any) {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  }

  async addIceCandidate(pc: RTCPeerConnection, candidate: any) {
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
}