export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  email: string;
  role: UserRole;
  displayName?: string;
  token?: string;
}
