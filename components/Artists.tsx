import Image from "next/image";
import React from "react";

type FollowedArtistsProps = {
  followedArtists: {
    artists: {
      cursors: {};
      href: string;
      items: {
        external_urls: {
          spotify: string;
        };
        followers: {
          total: number;
        };
        genres: [];
        href: string;
        id: string;
        images: {
          height: number;
          width: number;
          url: string;
        }[];
        name: string;
        popularity: number;
        type: string;
        uri: string;
      }[];
    };
  };
};

const Artists = ({ followedArtists }: FollowedArtistsProps) => {
  console.log("Followed artists: ", followedArtists);

  return (
    <section className="w-full h-full flex gap-8 justify-center">
      {followedArtists?.artists?.items?.map((artist) => (
        <div key={artist.id} className="text-white text-center">
          <Image
            src={artist.images[0].url}
            height={artist.images[0].height}
            width={artist.images[0].width}
            alt={`Band image of ${artist.name}`}
            className="w-[250px] h-[250px] mb-2"
          />
          <h1 className="text-2xl font-bold">{artist.name}</h1>
        </div>
      ))}
    </section>
  );
};

export default Artists;
