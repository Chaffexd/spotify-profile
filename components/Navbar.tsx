"use client";
import Link from "next/link";
import React from "react";
import { FaSpotify, FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiMicrophone, GiBackwardTime } from "react-icons/gi";
import { IoMusicalNotes } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex flex-col justify-between bg-black items-center h-screen fixed">
      <div>
        <Link href={"/login"}>
          <FaSpotify className="pt-8 w-24 h-24" style={{ color: "#1DB954" }} />
        </Link>
      </div>
      <div className={`flex flex-col text-white text-center`}>
        <Link
          href={"/"}
          className={`px-6 py-4 flex items-center flex-col border-l-4 border-l-transparent
          ${pathname === "/" ? "!border-l-green-500 bg-gray-700" : ""}`}
        >
          <CgProfile className="h-8 w-8 pb-1" />
          Profile
        </Link>
        <Link
          href={"/artists"}
          className={`px-6 py-4 flex items-center flex-col border-l-4 border-l-transparent
          ${pathname === "/artists" ? "!border-l-green-500 bg-gray-700" : ""}`}
        >
          <GiMicrophone className="h-8 w-8 pb-1" />
          Top Artists
        </Link>
        <Link
          href={"/tracks"}
          className={`px-6 py-4 flex items-center flex-col border-l-4 border-l-transparent
          ${pathname === "/tracks" ? "!border-l-green-500 bg-gray-700" : ""}`}
        >
          <IoMusicalNotes className="h-8 w-8 pb-1" />
          Top Tracks
        </Link>
        <Link
          href={"/recent"}
          className={`px-6 py-4 flex items-center flex-col border-l-4 border-l-transparent
          ${pathname === "/recent" ? "!border-l-green-500 bg-gray-700" : ""}`}
        >
          <GiBackwardTime className="h-8 w-8 pb-1" />
          Recent
        </Link>
        <Link
          href={"/playlists"}
          className={`px-6 py-4 flex items-center flex-col border-l-4 border-l-transparent
          ${pathname === "/playlists" ? "!border-l-green-500 bg-gray-700" : ""}`}
        >
          <RiPlayListFill className="h-8 w-8 pb-1" />
          Playlists
        </Link>
      </div>
      <div>
        <Link
          href={"https://github.com/Chaffexd/spotify-profile"}
          target="_blank"
        >
          <FaGithub className="pb-8 w-16 h-16" style={{ color: "#9B9B9B" }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
