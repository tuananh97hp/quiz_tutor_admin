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
