import Image from "next/image";
import Link from "next/link";
import React from "react";
import FeatureChart from "./FeatureChart";

type PlaylistProps = {
  playlist: {
    external_urls: string;
    images: {
      width: number;
      height: number;
      url: string;
    }[];
    name: string;
    owner: {
      display_name: string;
    };
    tracks: {
      items: {
        track: {
          album: {
            artists: {
              name: string;
            }[];
            images: {
              width: number;
              height: number;
              url: string;
            }[];
            name: string;
          };
          artists: {
            name: string;
          }[];
          name: string;
          id: string;
        };
      }[];
    };
  };
  trackFeatures: {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
    valence: number;
  };
  averages: {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
    valence: number;
  };
};

const SinglePlaylistDetail = ({ playlist, averages }: PlaylistProps) => {
  console.log("Averages =", averages);

  return (
    <div className="flex md:flex-row flex-col gap-20">
      <div className="md:w-1/3 text-center">
        <Image
          src={playlist.images[0].url}
          width={300}
          height={300}
          alt={`Image of playlist cover ${playlist.images[0].url}`}
          className="m-auto"
        />
        <h1 className="mt-4 text-xl font-bold">{playlist.name}</h1>
        <h2 className="mb-4">By {playlist.owner.display_name}</h2>
        <h3 className="text-sm">{playlist.tracks.items.length} Tracks</h3>
        <FeatureChart averages={averages} trackFeatures={averages} />
      </div>
      <div className="w-full text-white">
        {playlist?.tracks?.items?.map((track) => (
          <Link href={`/track/${track.track.id}`} key={track.track.id}>
            <div className="mb-4 flex items-center hover:bg-gray-700 p-4 rounded">
              <Image
                src={track.track.album.images[0].url}
                width={50}
                height={50}
                alt={`Album cover for ${track.track.album.name}`}
                className="mr-4"
              />
              <div>
                <p className="sm:text-lg text-sm">{track.track.name}</p>
                <div className="flex">
                  <p className="mr-2 sm:text-lg text-sm">{track.track.artists[0].name}</p>
                  &#x2022;
                  <p className="ml-2 sm:text-lg text-sm">{track.track.album.name}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SinglePlaylistDetail;
