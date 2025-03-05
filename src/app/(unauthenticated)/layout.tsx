import React from 'react';
import RadialBackground from '@/components/shared/Background/RadialBackground';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default async function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Reusable background component */}
      <RadialBackground />

      {/* Content wrapper stays above the background */}
      <div className="relative mx-auto w-full max-w-md">{children}</div>
    </main>
  );
}
