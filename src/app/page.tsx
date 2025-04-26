import { getCurrentUser } from '@/utils/session';
import { notFound, redirect } from 'next/navigation';
import { USER_ROLE } from '@/utils/constants';

const IndexPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect('/login');
  }

  switch (currentUser?.role) {
    case USER_ROLE.ADMIN:
      return redirect('/admin');
    case USER_ROLE.TEACHER:
      return redirect('/teacher');
    case USER_ROLE.STUDENT:
      return redirect('/student');
    case USER_ROLE.REFERRER:
      return redirect('/referrer');
    default:
      return notFound();
  }
};

export default IndexPage;
