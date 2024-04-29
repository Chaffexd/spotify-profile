"use client";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const UserProfile = () => {
  const session = useSession();
  console.log("Current Session: ", session);

  return (
    <div className="w-full flex flex-col justify-center items-center text-white">
      <div className="flex items-center flex-col">
        <Image src={""} width={200} height={100} alt="User profile picture" />
        <h1 className="text-3xl font-bold py-8">Shane Chaffe</h1>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span>0</span>
          <p>FOLLOWERS</p>
        </div>
        <div className="flex flex-col items-center">
          <span>0</span>
          <p>FOLLOWING</p>
        </div>
      </div>
      <button
        className="border border-white border-solid p-2 w-28 h-10 rounded-full hover:bg-white hover:text-black mt-8"
        onClick={() => signOut()}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default UserProfile;
