export interface Attendance {
  id?: number;
  userId: number;
  userEmail: string;
  userName: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
}

export interface RecognitionStatus {
  active: boolean;
  message: string;
} 