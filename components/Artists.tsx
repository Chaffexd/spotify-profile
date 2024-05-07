import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MouseEvent } from "react";

type Items = {
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

type FollowedArtistsProps = {
  topArtistsLong: Items;
  topArtistsMedium: Items;
  topArtistsShort: Items;
};

const Artists = ({
  topArtistsLong,
  topArtistsMedium,
  topArtistsShort,
}: FollowedArtistsProps) => {
  const [selectedDuration, setSelectedDuration] = useState("All Time");
  console.log("Top artists: ", topArtistsLong);

  let items = [];

  switch (selectedDuration) {
    case "All Time":
      items = topArtistsLong?.items || [];
      break;

    case "Last 6 Months":
      items = topArtistsMedium.items || [];
      break;

    case "Last 4 Weeks":
      items = topArtistsShort?.items || [];
      break;

    default:
      items = topArtistsLong?.items || [];
      break;
  }

  const handleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const duration = event.currentTarget.dataset.value;
    setSelectedDuration(duration ?? "");
    console.log(selectedDuration)
  };

  return (
    <>
      <div className="my-12 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Top Artists</h1>
        <div className="text-slate-400 flex gap-6">
          <button onClick={handleFilter} data-value="All Time" className={`${selectedDuration === "All Time" ? "underline text-white" : ""}`}>All Time</button>
          <button onClick={handleFilter} data-value="Last 6 Months" className={`${selectedDuration === "Last 6 Months" ? "underline text-white" : ""}`}>Last 6 Months</button>
          <button onClick={handleFilter} data-value="Last 4 Weeks" className={`${selectedDuration === "Last 4 Weeks" ? "underline text-white" : ""}`}>Last 4 Weeks</button>
        </div>
      </div>
      <section className="w-full h-full gap-16 flex flex-wrap justify-center">
        {items?.map((artist) => (
          <div key={artist.id} className="text-white text-center">
            <Link href={`/artist/${artist.id}`}>
              <Image
                src={artist.images[0].url}
                height={artist.images[0].height}
                width={artist.images[0].width}
                alt={`Band image of ${artist.name}`}
                className="w-[250px] h-[250px] mb-2 rounded-full"
              />
              <h1 className="text-2xl font-bold">{artist.name}</h1>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Artists;
