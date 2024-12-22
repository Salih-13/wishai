"use client";
import React, { useEffect, useRef,useState } from "react";
import style from "../newcard/page.css";
import { supabase } from "@/app/supabase/supabase";
import Image from "next/image";

const Page = () => {
    const [userData, setUserData] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
  let  uid;
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

  console.log("outer",userId);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            if (!userId) return; // Wait for userId to be available before fetching data
  
          // Fetch user data from the 'users' table in Supabase
          const { data, error } = await supabase
  .from("users")
  .select("data1, data2, data3, data4, img") // Select all necessary fields
  .eq("uid", userId) // Ensure the userId matches
  .order('created_at', { ascending: false }) // Sort by created_at in descending order to get the latest row
  .limit(1) // Fetch only one row
  .single(); // Ensure only one result


           
  
          if (error) throw error;
  
          setUserData(data); // Set the user data
          console.log("data1 printed here",data.data1);
          setImages(data.img || []); // Set images from the 'img' field, default to an empty array if not available
        } catch (error) {
          console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false); // Stop loading
        }
      };
  
      fetchData();
    }, [userId]); // Empty dependency array to fetch data on mount
  
  const bookRef = useRef(null);

  useEffect(() => {
    const flipBook = (elBook) => {
      elBook.style.setProperty("--c", 0); // Set current page
      elBook.querySelectorAll(".page").forEach((page, idx) => {
        page.style.setProperty("--i", idx);
        page.addEventListener("click", (evt) => {
          if (evt.target.closest("a")) return;
          const curr = evt.target.closest(".back") ? idx : idx + 1;
          elBook.style.setProperty("--c", curr);
        });
      });
    };

    if (bookRef.current) {
      flipBook(bookRef.current);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="book" ref={bookRef}>
        <div className="page">
          <div className="front cover flex items-center justify-center text-center">
            <h1 className="text-4xl font-bold">Happy Birthday!!</h1>
            <p>Make you special days more special</p>
          </div>
          <div className="back">
            
          </div>
        </div>

        <div className="page">
          <div className="front">
            <p>{userData?.data1}</p>
          </div>
          <div className="back">
          {userData?.img && userData.img[0] && (
              <Image
                src={userData.img[0]} // Accessing the first image URL in the array
                alt="Uploaded Image"
                width={50}
                height={50}
                className="rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="page">
          <div className="front">
           
            <p>{userData?.data2}</p>
          </div>
          <div className="back">
            <p></p>
          </div>
        </div>

        <div className="page">
          <div className="front">
            <h2></h2>
            <p>{userData?.data3}</p>
          </div>
          <div className="back">
            <p></p>
          </div>
        </div>

        <div className="page">
          <div className="front">
            <p>{userData?.data4}</p>
          </div>
          <div className="back">
            <p></p>
          </div>
        </div>

        <div className="page">
          <div className="front">
            <img src="https://picsum.photos/id/1073/600/600" alt="Img 2"></img>
          </div>
          <div className="back cover">
            <h3>That's all, folks</h3>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page