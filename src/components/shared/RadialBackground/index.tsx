import React from 'react';

/**
 * RadialBackground is a reusable background component
 * that sets a full-screen radial gradient background with dark mode support.
 */
const RadialBackground = () => {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="dark:bg-background relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]"></div>
      </div>
    </div>
  );
}

export default RadialBackground
