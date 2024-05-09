import Image from "next/image";
import Link from "next/link";
import React from "react";

type PlaylistProps = {
  playlists: {
    items: {
      external_urls: {
        spotify: string;
      };
      id: string;
      images: {
        width: number;
        height: number;
        url: string;
      }[];
      name: string;
      tracks: {
        total: number;
      };
    }[];
  };
};

const PlaylistTile = ({ playlists }: PlaylistProps) => {

  return (
    <div className="md:flex md:flex-wrap md:flex-row flex-col flex items-center">
      {playlists?.items?.map((playlist) => (
        <div key={playlist.id} className="sm:w-1/3">
          <Link href={`/playlists/${playlist.id}`} className="flex items-center flex-col mb-8">
            <Image
              src={playlist.images[0].url}
              width={300}
              height={300}
              alt={`Playlist cover image for ${playlist.name}`}
            />
            <div className="text-center">
              <h2 className="mt-4 text-xl font-bold">{playlist.name}</h2>
              <h3 className="text-sm">{`${playlist.tracks.total} TRACKS`}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PlaylistTile;
