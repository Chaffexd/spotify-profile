import IconLoader from "@/components/Loader";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";
import UserProfile from "@/components/UserProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [profile, setProfile] = useState();
  const [followedArtists, setFollowedArtists] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [loading, isLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    //@ts-expect-error
    if (!session?.user || session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    //@ts-expect-error
    if (session && session.accessToken) {
      //@ts-expect-error
      setToken(session.accessToken);
      // console.log("HOME SESSION = ", session);
    }

    const fetchProfile = async () => {
      try {
        isLoading(true);
        const userProfile = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userProfile.ok) {
          console.error("Error with Spotify API: ", userProfile);
        }

        const userProfileData = await userProfile.json();

        setProfile(userProfileData);
        console.log("Data from Spotify = ", userProfileData);

        const followedArtists = await fetch(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const topTracksResponse = await topTracks.json();
        setTopTracks(topTracksResponse);
        console.log("Top tracks = ", topTracksResponse);
      } catch (error) {
        isLoading(false);
        console.error("error = ", error);
      } finally {
        isLoading(false);
      }
    };

    fetchProfile();
  }, [session, token]);

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
        <TopArtists topArtists={topArtists} />
        <TopTracks topTracks={topTracks} />
      </div>
    </div>
  );
}
