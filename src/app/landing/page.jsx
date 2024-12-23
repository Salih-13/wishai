"use client";
import { supabase } from "@/app/supabase/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { RiAiGenerate2 } from "react-icons/ri";

// Importing Card Components
import AnniversaryCard from "../components/cards/AnniversaryCard";
import BirthdayCard from "../components/cards/BirthdayCard";
import { useRouter } from "next/navigation";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [occasion, setOccasion] = useState("");
  const [relation, setRelation] = useState("");
  const [userId, setUserId] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); // New state to hold image URLs

  const router = useRouter();
  

  useEffect(() => {
    // Listen for changes in authentication state (login/logout)
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id); // Set user ID when the user is logged in
        console.log("User ID:", session.user.id);
        
      } else {
        setUserId(null); // Clear the user ID when the user logs out
      }
    });

    // Cleanup function to unsubscribe on component unmount
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // Safely invoke the cleanup function
      }
    };
  }, []);

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

  const generatePrompt = (userPrompt, occasion, relation) => `
  Generate a thoughtful and heartfelt special occasion card message add as much as emojis tmake the text feel more cheerful.Even if name isnt provideddont as to upload name. 

  Occasion: ${occasion}
  Relation: ${relation}

  The message should be a complete and self-contained wish, divided into four paragraphs. Each paragraph should focus on the following:

  1. The first paragraph should focus on why the person is important to the one who is wishing, highlighting the special connection and bond. It should express how much they mean to the sender and their impact on the sender's life.

  2. The second paragraph should reflect on how this day or occasion feels, emphasizing the significance of the event. It should evoke the emotions and joy that the occasion brings, making the person feel valued and celebrated.

  3. The third paragraph should combine these thoughts, connecting the importance of the person and the significance of the day. It should highlight how these two aspects come together to make the moment memorable and meaningful.

  4. The fourth paragraph should express well wishes for the future. It should end with an optimistic tone, wishing the person continued success, happiness, or joy in life, while reaffirming the sender's feelings and love.

  User's additional prompt: "${userPrompt}"

  Please ensure each paragraph ends with "**" to clearly separate the sections.
`;

  const handleGenerateCard = async () => {
    if (!prompt || !occasion || !relation) {
      alert("Please fill all fields before generating.");
      return;
    }

    setIsLoading(true);

    const uploadedImageUrls = [];
    let para1;
    let para2;
    let para3;
    let para4;

    try {
      const modifiedPrompt = generatePrompt(prompt, occasion, relation);
      const result = await model.generateContent(modifiedPrompt);
      const generatedText = result.response.text();

      // Split the result by '**' to separate the paragraphs
      const paragraphs = generatedText
        .split("**")
        .map((para) => para.trim())
        .filter((para) => para !== "");

      // Ensure we have the correct number of paragraphs (4 paragraphs as per the prompt)
      if (paragraphs.length === 4) {
        para1 = paragraphs[0];
        para2 = paragraphs[1];
        para3 = paragraphs[2];
        para4 = paragraphs[3];

        // Store the paragraphs in the state or use them as required
        console.log("Paragraph 1:", para1);
        console.log("Paragraph 2:", para2);
        console.log("Paragraph 3:", para3);
        console.log("Paragraph 4:", para4);

        setResult(generatedText); // You can still use the full result as needed
      } else {
        alert(
          "The generated text does not have the expected 4 paragraphs. Please try again."
        );
      }

      //Swalih code - update backend here just replace the variables that has data

      for (const image of images) {
        console.log("Uploading image:", image);

        const uniqueFileName = `${userId}/${Date.now()}_${image.name}`; // Generate a unique name
        const { data, error } = await supabase.storage
          .from("images")
          .upload(uniqueFileName, image);

        if (error) {
          console.error("Upload error:", error);
          alert(`Failed to upload ${image.name}: ${error.message}`);
          continue; // Skip this image and continue with the rest
        }

        // Get the public URL for the uploaded image
        const { data: urlData, error: urlError } = supabase.storage
          .from("images")
          .getPublicUrl(data.path);

        if (urlError) {
          console.error("Public URL error:", urlError);
          alert(`Failed to retrieve URL for ${image.name}`);
          continue; // Skip this image and continue with the rest
        }

        // Add the URL to the array
        uploadedImageUrls.push(urlData.publicUrl);

        console.log(`Image uploaded successfully: ${data.path}`);
      }

      // Ensure at least one image was successfully uploaded
      if (uploadedImageUrls.length === 0) {
        alert("No images were successfully uploaded. Please try again.");
        return;
      }

      // Log the uploaded image URLs
      console.log("Uploaded Image URLs:", uploadedImageUrls);
      setImageUrls(uploadedImageUrls);

      // Now, update the user table with the image URLs
      if (userId) {
        const { error } = await supabase.from("users").insert({
          data1: para1,
          data2: para2,
          data3: para3,
          data4: para4,
          occ:occasion,
          uid: userId,
          img: uploadedImageUrls, // Ensure this is an array
        });

        if (error) {
          console.error("Error updating prompt:", error);
          alert("Failed to save prompt. Please try again.");
          return;
        }

        console.log("Prompt saved successfully to the database.");
      } else {
        alert("User is not logged in.");
        return;
      }

      alert("Images uploaded successfully and card generated!");
      router.push("/card");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const getCardTemplate = (occasion, result, images) => {
    switch (occasion) {
      case "Birthday":
        return <BirthdayCard message={result} images={images} />;
      case "Anniversary":
        return <BirthdayCard message={result} images={images} />;
      case "Graduation":
        return <BirthdayCard message={result} images={images} />;
      case "Wedding":
        return <BirthdayCard message={result} images={images} />;
      case "Other":
        return <BirthdayCard message={result} images={images} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          AI Wish Card Generator
        </h1>
        <p className="text-xl text-center text-gray-700 mb-8">
          Enter your special occasion prompt, upload up to 5 images, and
          generate a custom AI-generated card.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Occasion:
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full p-3 border-2 text-black rounded-lg focus:outline-none"
          >
            <option className="text-black" value="">
              Select an Occasion
            </option>
            <option className="text-black" value="Anniversary">
              Anniversary
            </option>
            <option className="text-black" value="Birthday">
              Birthday
            </option>
            <option className="text-black" value="Graduation">
              Graduation
            </option>
            <option className="text-black" value="Wedding">
              Wedding
            </option>
            <option className="text-black" value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Relation:
          </label>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full p-3 border-2 text-black rounded-lg focus:outline-none"
          >
            <option className="text-black" value="">
              Select a Relation
            </option>
            <option className="text-black" value="Friend">
              Friend
            </option>
            <option className="text-black" value="Family">
              Family
            </option>
            <option className="text-black" value="Colleague">
              Colleague
            </option>
            <option className="text-black" value="Partner">
              Partner
            </option>
            <option className="text-black" value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter a specific detail about the occasion..."
            className="w-full p-3 rounded-lg text-gray-800 border-2 border-gray-300 focus:outline-none"
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

        <div className="flex justify-center">
          <button
            onClick={handleGenerateCard}
            className={`flex items-center px-8 py-3 ${
              isLoading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white text-lg font-semibold rounded-lg`}
          >
            {isLoading ? "Generating..." : "Generate Card"}
            <RiAiGenerate2 className="ml-2" size={20} />
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Your Generated Card
            </h2>
            {getCardTemplate(occasion, result, images)}
          </div>
        )}
      </div>
    </div>
  );
}
