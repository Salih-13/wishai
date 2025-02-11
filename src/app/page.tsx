"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { CiGlobe } from "react-icons/ci";
import { FaGithub } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";

export default function Home() {

  const router = useRouter();
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

       
        <button
        onClick={()=>router.push("/login")}
          className="px-8 py-3 bg-white text-purple-700 text-lg font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:text-white transition duration-300"
         
          >
          Get Started
        </button>
        
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Salih-13/wishai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          View on GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoDocumentText />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
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
