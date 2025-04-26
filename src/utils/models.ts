import { IClass, ISchedule } from '@/types/models';
import { addMinutes, differenceInMilliseconds, getDay, isBefore, parse } from 'date-fns';
import _ from 'lodash';
import { SCHEDULE_STATUS } from '@/utils/constants';

export const currentScheduleOfDate = (classItem?: IClass, date: Date = new Date()) => {
  if (!classItem) return;

  const today = getDay(date);
  return _(classItem?.schedules || [])
    .filter((cls) => +cls.day_of_week === today)
    .first();
};

export const percentageSchedule = (currentSchedule?: ISchedule, date: Date = new Date()) => {
  if (!currentSchedule) return 0;

  const startTime = parse(currentSchedule.start_time, 'HH:mm', new Date());
  const endTime = parse(currentSchedule.end_time, 'HH:mm', new Date());

  if (isBefore(date, endTime) && isBefore(startTime, date)) {
    const totalDuration = differenceInMilliseconds(endTime, startTime);
    const elapsedTime = differenceInMilliseconds(date, startTime);

    return Math.floor((elapsedTime / totalDuration) * 100);
  } else if (isBefore(endTime, date)) {
    return 100;
  } else {
    return 0;
  }
};

export const getStatusSchedule = (currentSchedule?: ISchedule) => {
  if (!currentSchedule)
    return {
      status: SCHEDULE_STATUS.UPCOMING,
      label: 'Sắp diễn ra',
    };

  const startTime = parse(currentSchedule.start_time, 'HH:mm', new Date());
  const endTime = parse(currentSchedule.end_time, 'HH:mm', new Date());

  if (isBefore(startTime, new Date()) && isBefore(new Date(), endTime)) {
    return {
      status: SCHEDULE_STATUS.PROCESSING,
      label: 'Đang học',
    };
  }

  if (isBefore(new Date(), startTime)) {
    return {
      status: SCHEDULE_STATUS.UPCOMING,
      label: 'Sắp diễn ra',
    };
  }
  return {
    status: SCHEDULE_STATUS.COMPLETED,
    label: 'Đã kết thúc',
  };
};

export const checkUpcomingOrStarted = (currentSchedule?: ISchedule) => {
  if (!currentSchedule) return false;
  const now = new Date();
  const startTime = parse(currentSchedule.start_time, 'HH:mm', new Date());
  const nowMinus30 = addMinutes(now, 30);

  return isBefore(startTime, nowMinus30);
};
