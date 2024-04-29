"use client";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'

const UserProfile = ({ profile }) => {
  const session = useSession();

  console.log("Spotify Profile data =", profile);

  const { display_name, external_urls, followers, images } = profile;

  return (
    <div className="w-full flex flex-col justify-center items-center text-white">
      <div className="flex items-center flex-col">
        <Image src={images[1].url} width={200} height={100} alt="User profile picture" />
        <Link href={external_urls.spotify} target="_blank"><h1 className="text-3xl font-bold py-8 hover:text-green-700">{display_name}</h1></Link>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span>{followers.total}</span>
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
