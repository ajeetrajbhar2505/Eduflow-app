// src/app/core/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('https://quiznewbackend-ndlm.onrender.com');
  private currentRoomId: string | null = null;
  private currentStudentName: string | null = null;


  createRoom(teacherName: string, subject: string): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('create-room', { teacherName, subject }, (response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  joinRoom(roomId: string, studentName: string): Observable<any> {
    this.currentRoomId = roomId;
    this.currentStudentName = studentName;

    return new Observable(observer => {
      this.socket.emit('join-room', { roomId, studentName }, (response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  onRoomCreated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room-created', (data) => observer.next(data));
    });
  }

  onRoomInfo(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room-info', (data) => observer.next(data));
    });
  }

  onStudentJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('student-joined', (data) => observer.next(data));
    });
  }

  sendOffer(targetId: string, sdp: RTCSessionDescriptionInit): void {
    this.socket.emit('offer', { targetId, sdp });
  }

  sendAnswer(targetId: string, sdp: RTCSessionDescriptionInit): void {
    this.socket.emit('answer', { targetId, sdp });
  }

  sendIceCandidate(targetId: string, candidate: RTCIceCandidateInit): void {
    this.socket.emit('ice-candidate', { targetId, candidate });
  }

  onOffer(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('offer', (data) => observer.next(data));
    });
  }

  onAnswer(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('answer', (data) => observer.next(data));
    });
  }

  onIceCandidate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('ice-candidate', (data) => observer.next(data));
    });
  }

  sendMessage(message: string): void {
    if (this.currentRoomId && this.currentStudentName) {
      this.socket.emit('send-message', {
        message,
        roomId: this.currentRoomId,
        userName: this.currentStudentName,
        role: 'student'
      });
    } else {
      this.socket.emit('send-message', { message });
    }
  }

  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('new-message', (data) => observer.next(data));
    });
  }

  raiseHand(): void {
    if (this.currentRoomId && this.currentStudentName) {
      this.socket.emit('raise-hand', {
        roomId: this.currentRoomId,
        studentName: this.currentStudentName
      });
    } else {
      this.socket.emit('raise-hand');
    }
  }

  lowerHand(): void {
    if (this.currentRoomId && this.currentStudentName) {
      this.socket.emit('lower-hand', {
        roomId: this.currentRoomId,
        studentName: this.currentStudentName
      });
    }
  }

  sendTyping(isTyping: boolean): void {
    if (this.currentRoomId && this.currentStudentName) {
      this.socket.emit('typing', {
        roomId: this.currentRoomId,
        studentName: this.currentStudentName,
        isTyping
      });
    }
  }

  onHandRaised(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('hand-raised', (data) => observer.next(data));
    });
  }

  onTyping(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('typing', (data) => observer.next(data));
    });
  }

  toggleRecording(isRecording: boolean): void {
    this.socket.emit('toggle-recording', { isRecording });
  }

  onRecordingStatus(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('recording-status', (data) => observer.next(data));
    });
  }

  onLectureEnded(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('lecture-ended', (data) => observer.next(data));
    });
  }

  onError(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('error', (data) => observer.next(data));
    });
  }

  disconnect(): void {
    this.currentRoomId = null;
    this.currentStudentName = null;
    this.socket.disconnect();
  }
}