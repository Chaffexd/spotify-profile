import IconLoader from "@/components/Loader";
import Tracks from "@/components/Tracks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TracksPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [topTracksShort, setTopTracksShort] = useState();
  const [topTracksMedium, setTopTracksMedium] = useState();
  const [topTracksLong, setTopTracksLong] = useState();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);

        const short = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const dataShort = await short.json();
        setTopTracksShort(dataShort);

        const medium = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const dataMedium = await medium.json();
        setTopTracksMedium(dataMedium);

        const long = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const dataLong = await long.json();
        setTopTracksLong(dataLong);

        if (!long.ok || !medium.ok || !short.ok) {
          console.log("Something went wrong fetching artists.");
        }

        if (long.status === 401 || medium.status === 401 || short.status === 401) {
          router.push("/login")
          signOut()
        }
      } catch (error) {
        console.log("Something went wrong getting tracks: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [session]);

  if (loading) {
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
