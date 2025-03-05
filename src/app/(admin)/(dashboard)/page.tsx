import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="flex flex-col flex-1 p-24">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={300}
        height={37}
        priority
      />
    </main>
  );
};

export default HomePage;
