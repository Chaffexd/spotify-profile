import Artists from "@/components/Artists";
import IconLoader from "@/components/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AristsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [topArtistsShort, setTopArtistsShort] = useState();
  const [topArtistsMedium, setTopArtistsMedium] = useState();
  const [topArtistsLong, setTopArtistsLong] = useState();
  const [loading, setIsLoading] = useState(false);

  console.log("Artists page = ", session);

  useEffect(() => {
    // @ts-expect-error
    if (!session || !session.accessToken || !session.user) {
      router.push("/login");
    }

    const fetchArtists = async () => {
      try {
        setIsLoading(true);
        const short = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const dataShort = await short.json();
        setTopArtistsShort(dataShort);

        const medium = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const dataMedium = await medium.json();
        setTopArtistsMedium(dataMedium);

        const long = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!long.ok || !medium.ok || !short.ok) {
          console.log("Something went wrong fetching artists.");
        }

        if (long.status === 401 || medium.status === 401 || short.status === 401) {
          router.push("/login")
          signOut()
        }

        const dataLong = await long.json();
        setTopArtistsLong(dataLong);
      } catch (error) {
        console.log("Something went wrong getting artists: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
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
      <Artists
        // @ts-expect-error
        topArtistsLong={topArtistsLong}
        // @ts-expect-error
        topArtistsMedium={topArtistsMedium}
        // @ts-expect-error
        topArtistsShort={topArtistsShort}
      />
    </div>
  );
};

export default AristsPage;
