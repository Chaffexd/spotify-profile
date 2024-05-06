import Artists from "@/components/Artists";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AristsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [followedArtists, setFollowedArtists] = useState();
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
        const response = await fetch(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          console.log("Something went wrong fetching artists.");
        }

        const data = await response.json();

        setFollowedArtists(data);
      } catch (error) {
        console.log("Something went wrong getting artists: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [session]);

  if (loading) {
    return <div className="text-white">Fetching data...</div>;
  }

  return (
    <div className="w-full">
      <Artists followedArtists={followedArtists} />
    </div>
  );
};

export default AristsPage;
