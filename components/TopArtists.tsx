import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopArtistsProps = {
  topArtists: {
    items: {
      external_urls: {};
      followers: {};
      genres: [string];
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }[];
  };
};

const TopArtists = ({ topArtists }: TopArtistsProps) => {
  const { items } = topArtists || [];

  return (
    <div className="w-full xl:w-1/2 xl:pl-36">
      <div className="flex justify-between items-center mb-4">
        <h1>Top Artists of All Time</h1>
        <button className="border border-white border-solid w-28 h-10 rounded-full hover:bg-white hover:text-black">
          <Link href={"/artists"}>See More</Link>
        </button>
      </div>
      <div className="">
        {items?.slice(0, 10).map((artist) => (
          <div className="mb-4" key={artist.id}>
            <Link href={`/artist/${artist.id}`} className="flex items-center gap-8 hover:bg-gray-500 rounded p-2">
            <Image
              src={artist.images[2].url}
              width={artist.images[2].width}
              height={artist.images[2].height}
              alt={`Image of ${artist.name}`}
              className="rounded-full w-16 h-16"
            />
            <h2 className="font-bold">{artist.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
