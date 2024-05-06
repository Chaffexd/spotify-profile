import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link';

type ProfileProps = {
  profile: {
    display_name: string;
    external_urls: {
      spotify: string
    }
    followers: {
      total: number
    }
    images: {
      url: string
    }[]
  }
  followedArtists: {
    artists: {
      items: {}[]
    }
  }
  userPlaylists: {
    total: number
  }
}

const UserProfile = ({ profile, followedArtists, userPlaylists }: ProfileProps) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (session.status === 'unauthenticated') {
    router.push("/login");
    return;
  }

  const { display_name, external_urls, followers, images } = profile || {};

  return (
    <div className="w-full flex flex-col justify-center items-center text-white mt-12">
      <div className="flex items-center flex-col">
        <Image src={images && images.length > 1 ? images[1]?.url : ''} width={200} height={100} alt="User profile picture" className="rounded-full" />
        <Link href={external_urls ? external_urls?.spotify : ""} target="_blank"><h1 className="text-3xl font-bold py-8 hover:text-green-700">{display_name}</h1></Link>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span className="text-[#1DB954] font-bold">{followers?.total}</span>
          <p>FOLLOWERS</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#1DB954] font-bold">{followedArtists?.artists?.items?.length}</span>
          <p>FOLLOWING</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#1DB954] font-bold">{userPlaylists?.total}</span>
          <p>PLAYLISTS</p>
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
