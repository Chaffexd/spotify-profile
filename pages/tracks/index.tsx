import IconLoader from "@/components/Loader";
import Tracks from "@/components/Tracks";
import { useHttp } from "@/hooks/useHttp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TracksPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // const [topTracksShort, setTopTracksShort] = useState();
  // const [topTracksMedium, setTopTracksMedium] = useState();
  // const [topTracksLong, setTopTracksLong] = useState();
  const [loading, setIsLoading] = useState(false);

  const { data: topTracksShort, loading: loadingShort } = useHttp(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topTracksMedium, loading: loadingMedium } = useHttp(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topTracksLong, loading: loadingLong } = useHttp(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    // @ts-expect-error
    session?.accessToken
  );

  if (loadingShort || loadingMedium || loadingLong) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <IconLoader />
      </div>
    );
  }
  return (
    <div className="xl:pl-40 w-full xl:pr-12 px-4 max-w-screen-xl m-auto">
      <Tracks
        // @ts-expect-error
        topTracksShort={topTracksShort}
        // @ts-expect-error
        topTracksMedium={topTracksMedium}
        // @ts-expect-error
        topTracksLong={topTracksLong}
      />
    </div>
  );
};

export default TracksPage;
