import Navbar from 'components/Navbar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <Navbar />
      <header className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-primary dark:text-secondary">
          Generate Reels from Quotes in Seconds
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-8">
          ReelinQ helps you turn inspiration into short-form content instantly. Just upload your quote and go viral.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded font-medium">
          Get Started for Free
        </button>
      </header>
    </div>
  );
}