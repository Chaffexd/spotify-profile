import Image from "next/image";
import Link from "next/link";
import React, { useState, MouseEvent } from "react";

type Items = {
  items: {
    album: {
      artists: {
        name: string;
      }[];
      name: string;
      images: {
        height: number;
        width: number;
        url: string;
      }[];
    };
    id: string;
    name: string;
    duration_ms: number;
  }[];
};

type FollowedTrackProps = {
  topTracksLong: Items;
  topTracksMedium: Items;
  topTracksShort: Items;
};

const Tracks = ({
  topTracksShort,
  topTracksMedium,
  topTracksLong,
}: FollowedTrackProps) => {
  const [selectedDuration, setSelectedDuration] = useState("All Time");

  let items = [];

  switch (selectedDuration) {
    case "All Time":
      items = topTracksLong?.items || [];
      break;

    case "Last 6 Months":
      items = topTracksMedium.items || [];
      break;

    case "Last 4 Weeks":
      items = topTracksShort?.items || [];
      break;

    default:
      items = topTracksLong?.items || [];
      break;
  }

  const handleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const duration = event.currentTarget.dataset.value;
    setSelectedDuration(duration ?? "");
    console.log(selectedDuration);
  };

  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="my-12 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Top Artists</h1>
        <div className="text-slate-400 flex gap-6">
          <button
            onClick={handleFilter}
            data-value="All Time"
            className={`${
              selectedDuration === "All Time" ? "underline text-white" : ""
            }`}
          >
            All Time
          </button>
          <button
            onClick={handleFilter}
            data-value="Last 6 Months"
            className={`${
              selectedDuration === "Last 6 Months" ? "underline text-white" : ""
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={handleFilter}
            data-value="Last 4 Weeks"
            className={`${
              selectedDuration === "Last 4 Weeks" ? "underline text-white" : ""
            }`}
          >
            Last 4 Weeks
          </button>
        </div>
      </div>
      <section className="w-full h-full flex flex-col flex-wrap justify-center">
        {items?.map((track) => (
          <div key={track.id} className="text-white mb-8 hover:bg-gray-500 rounded p-4 flex items-center">
            <Link href={`/track/${track.id}`} className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <Image
                  src={track?.album.images[0].url}
                  height={track?.album.images[0].height}
                  width={track?.album.images[0].width}
                  alt={`Band image of ${track.name}`}
                  className="w-[100px] h-[100px] mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">{track.name}</h1>
                  <div className="flex">
                    <p className="mr-2">{track.album.name}</p>
                    &#x2022;
                    <p className="ml-2">{track.album.artists[0].name}</p>
                  </div>
                </div>
              </div>
              <div>
                <time>{formatDuration(track.duration_ms)}</time>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Tracks;
