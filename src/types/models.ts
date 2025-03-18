export interface IAttendance {
  id: number;
  attendance_date: string;
  is_attendance: boolean;
}

export interface IClass {
  id: number;
  name: string;
  status: string;
  start_date: string;
  end_date?: string;
  schedules: ISchedule[];
}

interface ISchedule {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface ILocation {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}

export interface IStudent {
  id: number;
  username?: string;
  parent_name: string;
  parent_phone_number: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  address: string;
  gender: string;
  start_date: string;
  attendances_count?: number;
  end_date?: string;
  avatar?: string;
}

export interface IPayment {
  id: number;
  money: number;
  student_id: number;
  payment_date: string;
  payment_attendances_count: number;
  desc: string;
  first_name?: string;
  last_name?: string;
  user: IStudent;
  attendances: IAttendance[];
}

export interface IStudentAttendance {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  is_attendance: boolean;
}

export interface ITest {
  test: string;
}
