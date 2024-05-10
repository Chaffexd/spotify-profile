import IconLoader from "@/components/Loader";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { useHttp } from "@/hooks/useHttp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const RecentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // const [loading, isLoading] = useState(false);
  // const [recentlyPlayed, setRecentlyPlayer] = useState();

  const { data: recentlyPlayed, loading } = useHttp(
    "https://api.spotify.com/v1/me/player/recently-played",
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
      <h1 className="font-bold text-2xl mb-4">Recently Played</h1>
      <RecentlyPlayed
        // @ts-expect-error
        recentlyPlayed={recentlyPlayed}
      />
    </div>
  );
};

export default RecentPage;
