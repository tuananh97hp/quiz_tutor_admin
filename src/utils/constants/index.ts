export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  CSRF_TOKEN: 'csrf-token',
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

export type TStudentStatus = (typeof STUDENT_STATUS)[keyof typeof STUDENT_STATUS];
