export type LoginRequest = {
  username: string;
  password: string;
};

export interface User {
  id: number;
  name: string;
  status: string;
  role: string;
  email: string;
  description: string;
  phone_number: string;
  birth_date: string;
  address: string;
  gender: string;
  start_date: string;
  username?: string;
  parent_name?: string;
  parent_phone_number?: string;
  force_change_password: boolean;
  avatar?: string;
}
