import { Injectable } from '@angular/core';

export interface Exam {
  id: string;
  title: string;
  partner: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  mode: 'normal' | 'image';
}

export interface PartnerProfile {
  name: string;
  exams: number;
  achievements: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly onboarding = [
    { title: 'Splash', id: 'app_loader_screen', copy: 'Branded first impression with environment checks.' },
    { title: 'Login', id: 'modern_login_screen_with_socials', copy: 'OTP or social sign-in with device fingerprint consent.' },
    { title: 'OTP Verify', id: 'otp_verification_screen', copy: 'Time-boxed OTP input with resend limits.' },
    { title: 'Policies', id: 'terms_and_privacy', copy: 'Explicit acceptance for TOS and Privacy Policy.' },
  ];

  readonly exams: Exam[] = [
    { id: 'math-101', title: 'Quant Fundamentals', partner: 'Apex University', date: '2026-04-12T09:30:00Z', status: 'upcoming', mode: 'normal' },
    { id: 'bio-204', title: 'Image-based Anatomy', partner: 'HealthFirst', date: '2026-04-18T14:00:00Z', status: 'upcoming', mode: 'image' },
    { id: 'cs-320', title: 'Data Structures Final', partner: 'CodeBridge', date: '2026-03-05T10:00:00Z', status: 'completed', mode: 'normal' },
  ];

  readonly partners: PartnerProfile[] = [
    { name: 'Apex University', exams: 3, achievements: ['99.1% integrity score'], rating: 4.8 },
    { name: 'HealthFirst', exams: 2, achievements: ['Proctored labs ready'], rating: 4.6 },
    { name: 'CodeBridge', exams: 4, achievements: ['High-speed battle mode pilot'], rating: 4.7 },
  ];

  readonly systemStates = [
    { id: 're_connect_connection_screen', title: 'Reconnect', copy: 'Graceful offline/online transitions with retry and telemetry.' },
    { id: 'technical_issue_screen', title: 'Technical issue', copy: 'Safe fallback with incident ID and log bundle upload.' },
    { id: 'malpractice_detected', title: 'Malpractice', copy: 'Dedicated flow with evidence bundle and appeal entry.' },
    { id: 'app_snack_alerts_ui', title: 'Snack Alerts', copy: 'Consistent toast/snack patterns for errors and warnings.' },
  ];
}
