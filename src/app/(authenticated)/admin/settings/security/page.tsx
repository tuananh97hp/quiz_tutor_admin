import type { Metadata } from 'next';
import { getCurrentUser } from '@/utils/session';
import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
import { PasswordForm } from '@/components/(authenticated)/common/security/password';

export const metadata: Metadata = {
  title: 'Admin | Cài Đặt Bảo Mật',
};

export default async function SecuritySettingsPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <SettingsHeader
        title="Bảo Mật"
        subtitle="Tại đây bạn có thể quản lý mật khẩu và cài đặt bảo mật của mình."
      />

      <>
        {user && <PasswordForm user={user} />}

        <hr className="border-border/50 mt-6" />
      </>
    </div>
  );
}
