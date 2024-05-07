import Image from "next/image";
import React from "react";

type ArtistDataProps = {
  artistData: {
    external_urls: {
      spotify: string;
    };
    followers: {
      total: number;
    };
    genres: [string];
    href: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
  };
};

const ArtistDetail = ({ artistData }: ArtistDataProps) => {

  return (
    <div className="flex h-full justify-center flex-col items-center text-white">
      <Image
        src={artistData?.images[1]?.url}
        width={artistData?.images[1]?.width}
        height={artistData?.images[1]?.height}
        alt={`Image of ${artistData?.name}`}
        className="rounded-full -mt-20"
      />
      <div>
        <h1 className="text-7xl font-bold text-center mt-8">
          {artistData?.name}
        </h1>
        <div className="flex justify-center gap-4 mt-8">
          <div className="text-center">
            <p className="font-bold text-sky-600">{artistData?.followers?.total.toLocaleString()}</p>
            <p>FOLLOWERS</p>
          </div>
          <div className="text-center">
            {artistData?.genres?.map((genre, index) => (
              <p key={index} className="font-bold text-sky-600">{genre}</p>
            ))}
            <p>GENRES</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sky-600">{artistData?.popularity}%</p>
            <p>POPULARITY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
