import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-white">
        <Image
          className="dark:invert"
          src="/icon1.png" 
          alt="WishCraft AI logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to WishCraft AI
        </h1>
        <p className="text-xl font-light mb-6 drop-shadow-md text-center sm:text-left">
          Transform your special moments into magical, AI-generated greeting
          cards. Upload your photos and select a special occasion like birthdays,
          Valentine's Day, and more!
        </p>

        <Link href="/home">
        <button
          className="px-8 py-3 bg-white text-purple-700 text-lg font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:text-white transition duration-300"
          >
          Get Started
        </button>
        </Link>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/your-repository-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          View on GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoDocumentText />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiGlobe />
          Learn More
        </a>
      </footer>
    </div>
  );
}
