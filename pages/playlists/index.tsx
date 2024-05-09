import IconLoader from "@/components/Loader";
import PlaylistTile from "@/components/PlaylistTile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PlayListsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    if (session === undefined) {
      router.push("/login");
    }

    const fetchRecent = async () => {
      try {
        isLoading(true);
        const userPlaylists = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const playlistData = await userPlaylists.json();
        setPlaylists(playlistData);
      } catch (error) {
        console.error("Oh no! Something went wrong..", error);
        isLoading(false);
      } finally {
        isLoading(false);
      }
    };

    fetchRecent();
  }, [session]);

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
      playlists={playlists} />
    </div>
  );
};

export default PlayListsPage;
