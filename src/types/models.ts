export interface IAttendance {
  id: number;
  attendance_date: string;
  is_attendance: boolean;
  student_id: number;
  paid: boolean;
  student_name?: string;
  class_id: number;
  class_name?: string;
  teacher_id?: number;
  teacher_name?: string;
  fee: number;
  desc?: string;
}

export interface IAttendanceSummary {
  total_attendances: number;
  present_attendances: number;
  absent_attendances: number;
}

export interface IClass {
  id: number;
  name: string;
  status: string;
  fee: number;
  start_date: string;
  end_date?: string;
  teacher_id?: number;
  studentMeAttendance?: IAttendance;
  studentMeStudent?: IStudent;
  studentPresenceCount?: number;
  isConfirmed?: boolean;
  studentCount?: number;
  teacher?: ITeacher;
  schedules: ISchedule[];
}

export interface IClassSummary {
  total_classes: number;
  open_classes: number;
  close_classes: number;
}

export interface ISchedule {
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
  status: string;
  username?: string;
  parent_name: string;
  parent_phone_number: string;
  description: string;
  name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  address: string;
  gender: string;
  start_date: string;
  is_lesson_monitor?: boolean;
  attendances_count?: number;
  end_date?: string;
  avatar?: string;
}

export interface IStudentSummary {
  total_students: number;
  active_students: number;
  inactive_students: number;
  processing_students: number;
}

export interface ITeacher {
  id: number;
  status: string;
  username?: string;
  description: string;
  name: string;
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

export interface ITeacherSummary {
  total_teachers: number;
  active_teachers: number;
  inactive_teachers: number;
  processing_teachers: number;
}

export interface IReferrer {
  id: number;
  status: string;
  username?: string;
  description: string;
  name: string;
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

export interface IReferrerSummary {
  total_referrers: number;
  active_referrers: number;
  inactive_referrers: number;
  processing_referrers: number;
}

export interface IPayment {
  id: number;
  money: number;
  student_id: number;
  payment_date: string;
  payment_attendances_count?: number;
  desc: string;
  name?: string;
  user: IStudent;
  attendances: IAttendance[];
}

export interface IStudentAttendance {
  id: number;
  name: string;
  avatar?: string;
  is_attendance: number;
}

export interface ITest {
  test: string;
}
