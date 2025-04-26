'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const Logout = () => {
  return <Button onClick={() => signOut()}>l</Button>;
};

export default Logout;
