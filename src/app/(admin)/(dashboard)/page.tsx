import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="mx-auto -mt-4 w-full max-w-screen-2xl px-4 md:px-8">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={300}
        height={37}
        priority
      />
    </div>
  );
};

export default HomePage;
