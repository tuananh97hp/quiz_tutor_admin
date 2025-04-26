import type { Metadata } from 'next';

import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
// import { AvatarImageForm } from '@/components/admin/settings/profile/avatar-image';
import { ProfileForm } from '@/components/(authenticated)/common/profile/profile';
import { getCurrentUser } from '@/utils/session';

export const metadata: Metadata = {
  title: 'Học Sinh | Cài Đặt Hồ Sơ',
};

export default async function ProfileSettingsPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <SettingsHeader
        title="Hồ Sơ"
        subtitle="Tại đây bạn có thể chỉnh sửa thông tin cá nhân của mình."
      />

      {/*<AvatarImageForm className="mb-8 max-w-xl" user={user} />*/}
      {user && <ProfileForm className="mb-8 max-w-xl" user={user} />}
    </div>
  );
}
