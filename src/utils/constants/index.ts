export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  CSRF_TOKEN: 'csrf-token',
};

export const AUTH_CONFIG = {
  JWT_AGE: parseInt(process.env.NEXTAUTH_JWT_AGE || '1209600'),
  JWR_SECRET: process.env.NEXTAUTH_SECRET,
};

export const CLASS_STATUS = {
  OPEN: 'open',
  CLOSE: 'close',
};

export type TClassStatus = (typeof CLASS_STATUS)[keyof typeof CLASS_STATUS];

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PROCESSING: 'processing',
};

export const TEACHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PROCESSING: 'processing',
};

export const REFERRER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PROCESSING: 'processing',
};

export const USER_ROLE = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  REFERRER: 'referrer',
};

export const SCHEDULE_STATUS = {
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  UPCOMING: 'upcoming',
};

export type TStudentStatus = (typeof STUDENT_STATUS)[keyof typeof STUDENT_STATUS];
export type TTeacherStatus = (typeof TEACHER_STATUS)[keyof typeof TEACHER_STATUS];
export type TReferrerStatus = (typeof REFERRER_STATUS)[keyof typeof REFERRER_STATUS];

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
};
export type TAttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const DEFAULT_META_PAGINATE = {
  count: 0,
  last_page: 0,
  current_page: 0,
  per_page: 0,
  total: 0,
};
