import IconLoader from "@/components/Loader";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";
import UserProfile from "@/components/UserProfile";
import { useHttp } from "@/hooks/useHttp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState();
  const [followedArtists, setFollowedArtists] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [loading, isLoading] = useState(false);
  const { data: session } = useSession();
  const { test } = useHttp(
    "https://api.spotify.com/v1/me",
    // @ts-expect-error
    session?.accessToken
  );

  console.log("Hook Profile = ", test);

  useEffect(() => {
    console.log("SESSION TOKEN = ", session);
    //@ts-expect-error
    if (!session?.user || session.status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        isLoading(true);
        const userProfile = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            // @ts-expect-error
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!userProfile.ok) {
          console.error("Error with Spotify API: ", userProfile);
        }

        const userProfileData = await userProfile.json();

        setProfile(userProfileData);

        const followedArtists = await fetch(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const followedArtistsResponse = await followedArtists.json();

        setFollowedArtists(followedArtistsResponse);

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

        const userPlaylistResponse = await userPlaylists.json();
        setUserPlaylists(userPlaylistResponse);

        const topArtists = await fetch(
          "https://api.spotify.com/v1/me/top/artists",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const topArtistsResponse = await topArtists.json();
        setTopArtists(topArtistsResponse);

        const topTracks = await fetch(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const topTracksResponse = await topTracks.json();
        setTopTracks(topTracksResponse);
      } catch (error) {
        isLoading(false);
        console.error("error = ", error);
      } finally {
        isLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <IconLoader />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {profile && (
        <UserProfile
          //@ts-ignore
          profile={profile}
          //@ts-ignore
          followedArtists={followedArtists}
          //@ts-ignore
          userPlaylists={userPlaylists}
        />
      )}
      <div className="text-white mt-8 flex w-full h-full p-12 gap-12 flex-col lg:flex-row items-center">
        <TopArtists
          //@ts-ignore
          topArtists={topArtists}
        />
        <TopTracks
          //@ts-ignore
          topTracks={topTracks}
        />
      </div>
    </div>
  );
}
