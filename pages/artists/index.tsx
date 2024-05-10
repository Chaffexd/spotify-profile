import Artists from "@/components/Artists";
import IconLoader from "@/components/Loader";
import { useHttp } from "@/hooks/useHttp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AristsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: topArtistsShort, loading: shortLoading } = useHttp(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topArtistsMedium, loading: mediumLoading } = useHttp(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topArtistsLong, loading: longLoading } = useHttp(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    // @ts-expect-error
    session?.accessToken
  );

  useEffect(() => {
    // @ts-expect-error
    if (!session || !session.accessToken || !session.user) {
      router.push("/login");
    }

  }, [session]);

  if (shortLoading || mediumLoading || longLoading) {
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
