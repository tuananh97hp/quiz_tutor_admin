import { IStudent } from '@/models/IStudent';
import { IAttendance } from '@/models/IAttendance';

export interface IPayment {
  id: number;
  money: string;
  student_id: number;
  payment_date: string;
  desc: string;
  first_name?: string;
  last_name?: string;
  student: IStudent;
  attendances: IAttendance[];
}
