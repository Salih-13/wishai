"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function BookPage() {
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const images = JSON.parse(decodeURIComponent(searchParams.get("images"))) || [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Your Custom AI-Generated Card
        </h1>
        
        <div className="relative bg-gray-50 p-6 rounded-lg shadow-md">
          {/* Display Images */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Uploaded Image ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg"
              />
            ))}
          </div>

          {/* Display Generated Text */}
          <div className="text-center text-lg font-semibold text-gray-700">
            <p>{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
