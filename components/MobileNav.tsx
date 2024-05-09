"use client";
import Link from "next/link";
import React from "react";
import { FaSpotify, FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiMicrophone, GiBackwardTime } from "react-icons/gi";
import { IoMusicalNotes } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="xl:hidden flex bg-black items-center w-full h-auto fixed bottom-0 ">
      <div className={`flex items-center text-white w-full`}>
        <Link
          href={"/"}
          className={`px-2 py-2 flex flex-1 items-center text-center flex-col border-t-4 border-t-transparent text-[10px] hover:bg-gray-700
          ${pathname === "/" ? "!border-t-green-500 bg-gray-700" : ""}`}
        >
          <CgProfile className="h-6 w-6 pb-1" />
          Profile
        </Link>
        <Link
          href={"/artists"}
          className={`px-2 py-2 flex flex-1 items-center text-center flex-col border-t-4 border-t-transparent text-[10px] hover:bg-gray-700
          ${pathname === "/artists" ? "!border-t-green-500 bg-gray-700" : ""}`}
        >
          <GiMicrophone className="h-6 w-6 pb-1" />
          Top Artists
        </Link>
        <Link
          href={"/tracks"}
          className={`px-2 py-2 flex flex-1 text-center items-center flex-col border-t-4 border-t-transparent text-[10px] hover:bg-gray-700
          ${pathname === "/tracks" ? "!border-t-green-500 bg-gray-700" : ""}`}
        >
          <IoMusicalNotes className="h-6 w-6 pb-1" />
          Top Tracks
        </Link>
        <Link
          href={"/recent"}
          className={`px-2 py-2 flex flex-1 items-center text-center flex-col border-t-4 border-t-transparent text-[10px] hover:bg-gray-700
          ${pathname === "/recent" ? "!border-t-green-500 bg-gray-700" : ""}`}
        >
          <GiBackwardTime className="h-6 w-6 pb-1" />
          Recent
        </Link>
        <Link
          href={"/playlists"}
          className={`px-2 py-2 flex flex-1 items-center text-center flex-col border-t-4 border-t-transparent text-[10px] hover:bg-gray-700
          ${
            pathname === "/playlists" ? "!border-t-green-500 bg-gray-700" : ""
          }`}
        >
          <RiPlayListFill className="h-6 w-6 pb-1" />
          Playlists
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
