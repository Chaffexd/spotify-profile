import IconLoader from "@/components/Loader";
import PlaylistTile from "@/components/PlaylistTile";
import { useHttp } from "@/hooks/useHttp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PlayListsPage = () => {
  const { data: session } = useSession();
  const { data: playlists, loading } = useHttp(
    "https://api.spotify.com/v1/me/playlists",
    // @ts-expect-error
    session?.accessToken
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <IconLoader />
      </div>
    );
  }

  return (
    <div className="w-full text-white xl:pl-44 pt-20 xl:pr-12 px-12 max-w-screen-xl m-auto">
      <h1 className="font-bold text-2xl mb-4">Your Playlists</h1>
      <PlaylistTile
        // @ts-expect-error
        playlists={playlists}
      />
    </div>
  );
};

export default PlayListsPage;
