export interface Room {
  roomId: string;
  teacherName: string;
  subject: string;
  teacherId: string;
  students: Student[];
  isLive: boolean;
  isRecording?: boolean;
  createdAt: Date;
}


export interface Student {
  id: string;
  name: string;
  joinedAt: Date;
}

export interface Message {
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  role: 'teacher' | 'student' | 'system';
}

export interface HandRaise {
  studentId: string;
  studentName: string;
}

export interface RoomInfo {
  roomId: string;
  teacherName: string;
  subject: string;
  studentCount: number;
  isRecording: boolean;
  startedAt: Date;
}

export interface JoinResponse {
  success: boolean;
  message: string;
  roomInfo?: RoomInfo;
}


export interface HandRaiseData {
  studentId: string;
  studentName: string;
  timestamp: Date;
}

export interface TypingData {
  userId: string;
  userName: string;
  isTyping: boolean;
}