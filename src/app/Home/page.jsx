"use client";
import { useState } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi"; // For the + icon (Image Upload)
import { RiAiGenerate2 } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai"; // For delete icon

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length + images.length <= 5) {
      // Allow uploading only if the total number of images is 5 or less
      const newImages = [...images];
      for (let i = 0; i < files.length; i++) {
        newImages.push(URL.createObjectURL(files[i])); // Show image preview
      }
      setImages(newImages);
    } else {
      alert("You can upload a maximum of 5 images.");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleGenerateCard = () => {
    // Logic to generate the card (placeholder action for now)
    alert(`Generating card for: ${prompt}`);
    // Call the AI or image generation API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          WishCraftAI 
        </h1>
        <p className="text-xl text-center text-gray-700 mb-8">
          Enter your special occasion prompt, upload up to 5 images, and generate a custom AI-generated card.
        </p>

        {/* Text Input for Prompt */}
        <div className="relative mb-6">
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter a special occasion (e.g., Birthday, Valentine's Day)..."
            className="w-full p-3 pr-12 rounded-lg text-gray-800 border-2 border-gray-300 focus:outline-none"
          />
          {/* Plus Icon positioned at the top-right corner of the input */}
          <label
            htmlFor="image-upload"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-purple-600 hover:text-purple-700"
          >
            <FiPlus size={20} />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            multiple
          />
        </div>

        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Selected Images</h2>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Uploaded Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerateCard}
            className="flex items-center px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            <RiAiGenerate2 size={20} className="mr-2" />
            Generate Card
          </button>
        </div>
      </div>
    </div>
  );
}
