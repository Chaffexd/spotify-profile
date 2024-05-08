import Image from "next/image";
import Link from "next/link";
import React from "react";

type RecentProps = {
  recentlyPlayed: {
    items: {
      context: {};
      track: {
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
        name: string;
        duration_ms: number;
        id: string;
      };
    }[];
  };
};

const formatDuration = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const RecentlyPlayed = ({ recentlyPlayed }: RecentProps) => {
  return (
    <div className="flex flex-col">
      {recentlyPlayed?.items?.map((track) => (
        <div
          className="flex items-center my-4 hover:bg-gray-500 mr-16 p-2 rounded"
          key={track.track.album.name}
        >
          <Link
            href={`track/${track.track.id}`}
            className="flex items-center justify-between w-full my-4 hover:bg-gray-500 rounded"
          >
            <Image
              src={track.track.album.images[2].url}
              width={track.track.album.images[2].width}
              height={track.track.album.images[2].height}
              alt={`Image of ${track.track.album.artists[0].name}`}
              className="mr-4"
            />
            <div className="w-full flex justify-between items-center">
              <div>
                <p>{track.track.name}</p>
                <div className="flex">
                  <h2 className="mr-2">{track.track.album.artists[0].name}</h2>
                  &#x2022;
                  <h3 className="ml-2">{track.track.album.name}</h3>
                </div>
              </div>
              <div>
                <time>{formatDuration(track?.track?.duration_ms)}</time>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentlyPlayed;
