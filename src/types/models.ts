export interface IStudent {
  id: number;
  code: string;
  name: string;
  email: string;
  phone: string;
  jobRole: string;
  scoring: number;
  teamId: number;
}

export interface IClass {
  id: number;
  name: string;
}

export interface IPayment {
  id: number;
  name: string;
}
