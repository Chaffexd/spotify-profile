import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopTrackProps = {
  topTracks: {
    href: string;
    items: {
      album: {
        id: string;
        images: {
          height: number;
          url: string;
          width: number;
        }[];
        name: string;
      };
      artists: {
        name: string;
      }[];
      name: string;
      external_ids: {
        isrc: string;
      };
      duration_ms: number;
      id: string;
    }[];
  };
};

const formatDuration = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const TopTracks = ({ topTracks }: TopTrackProps) => {
  const { items } = topTracks || [];

  return (
    <div className="w-full xl:w-1/2 xl:pr-36">
      <div className="flex justify-between items-center mb-4">
        <h1>Top Tracks of All Time</h1>
        <button className="border border-white border-solid w-28 h-10 rounded-full hover:bg-white hover:text-black">
          <Link href={"/tracks"}>See More</Link>
        </button>
      </div>
      <div>
        {items?.slice(0, 10).map((track) => (
          <div key={track.external_ids.isrc} className="mb-4">
            <Link
              href={`/track/${track.id}`}
              className="flex items-center gap-8 hover:bg-gray-700 rounded p-2"
            >
              <Image
                src={track.album.images[2].url}
                width={track.album.images[2].width}
                height={track.album.images[2].height}
                alt={`Image of ${track.name}`}
                className="w-16 h-16"
              />
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h2 className="font-bold">{track.name}</h2>
                  <div className="flex">
                    <p className="mr-2">{track.artists[0].name}</p>
                    &#x2022;
                    <p className="ml-2">{track.album.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <time>{formatDuration(track.duration_ms)}</time>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;
