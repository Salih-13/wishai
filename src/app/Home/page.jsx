"use client";
import { supabase } from "@/app/supabase/supabase";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai"; // For delete icon
import { FiPlus } from "react-icons/fi"; // For the + icon (Image Upload)
import { RiAiGenerate2 } from "react-icons/ri";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const validFiles = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Please upload valid image files (JPEG, PNG, WEBP).");
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateCard = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      for (const image of images) {
        console.log("Uploading image:", image);

        const { data, error } = await supabase.storage
          .from("images")
          .upload(`user/${image.name}`, image);

        if (error) {
          console.error("Upload error:", error);
          alert(`Failed to upload ${image.name}: ${error.message}`);
          return; // Exit if one upload fails
        }

        console.log(`Image uploaded successfully: ${data.path}`);
      }

      alert("Images uploaded successfully and card generated!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          WishCraftAI
        </h1>
        <p className="text-xl text-center text-gray-700 mb-8">
          Enter your special occasion prompt, upload up to 5 images, and
          generate a custom AI-generated card.
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
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Selected Images
            </h2>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
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
            className={`flex items-center px-8 py-3 ${
              loading ? "bg-gray-500" : "bg-yellow-500"
            } text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300`}
            disabled={loading}
          >
            {loading ? (
              "Generating..."
            ) : (
              <>
                <RiAiGenerate2 size={20} className="mr-2" />
                Generate Card
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
