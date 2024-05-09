import IconLoader from "@/components/Loader";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const RecentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const [recentlyPlayed, setRecentlyPlayer] = useState();

  useEffect(() => {
    console.log("Session = ", session)
    if (session === undefined) {
      router.push("/login")
    }

    const fetchRecent = async () => {
      try {
        isLoading(true);
        const userRecent = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const recentData = await userRecent.json();
        setRecentlyPlayer(recentData);
        console.log("Recently: ", recentData);
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
      <h1 className="font-bold text-2xl mb-4">Recently Played</h1>
      <RecentlyPlayed 
      // @ts-expect-error
      recentlyPlayed={recentlyPlayed} />
    </div>
  );
};

export default RecentPage;
