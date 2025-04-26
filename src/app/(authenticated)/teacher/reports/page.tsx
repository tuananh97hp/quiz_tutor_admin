import { redirect } from 'next/navigation';

const StudentReportsPage = () => {
  redirect('/teacher/reports/attendance');
};

export default StudentReportsPage;
