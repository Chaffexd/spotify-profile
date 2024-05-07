import ArtistDetail from "@/components/ArtistDetail";
import IconLoader from "@/components/Loader";
import { signOut, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ArtistDetailPage = () => {
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const [artistData, setArtistData] = useState();
  const params = useParams();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchArist = async () => {
      try {
        isLoading(true);
        const artistResponse = await fetch(
          `https://api.spotify.com/v1/artists/${params.artistId}`,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!artistResponse.ok) {
          throw new Error("Error getting artist!");
        }

        if (artistResponse.status === 401) {
          router.push("/login")
          signOut()
        }

        const artistData = await artistResponse.json();
        console.log("Artist Data = ", artistData)
        setArtistData(artistData);
      } catch (error) {
        console.error("Error getting artists data =", error);
        isLoading(false);
      } finally {
        isLoading(false);
      }
    };
    fetchArist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <IconLoader />
      </div>
    );
  }
  return (
    <div className="w-full h-screen">
      <ArtistDetail 
      // @ts-expect-error
      artistData={artistData} />
    </div>
  );
};

export default ArtistDetailPage;
