import IconLoader from "@/components/Loader";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";
import UserProfile from "@/components/UserProfile";
import { useHttp } from "@/hooks/useHttp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: followedArtists, loading } = useHttp(
    "https://api.spotify.com/v1/me/following?type=artist",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: profile, loading: profileLoading } = useHttp(
    "https://api.spotify.com/v1/me",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: userPlaylists, loading: playlistLoading } = useHttp(
    "https://api.spotify.com/v1/me/playlists",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topArtists, loading: artistLoading } = useHttp(
    "https://api.spotify.com/v1/me/top/artists",
    // @ts-expect-error
    session?.accessToken
  );

  const { data: topTracks, loading: tracksLoading } = useHttp(
    "https://api.spotify.com/v1/me/top/tracks",
    // @ts-expect-error
    session?.accessToken
  );
  

  useEffect(() => {
    console.log("SESSION TOKEN = ", session);
    //@ts-expect-error
    if (!session?.user || session.status === "unauthenticated") {
      router.push("/login");
      return;
    }

  }, [session]);

  if (loading || profileLoading || playlistLoading || artistLoading || tracksLoading)
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
