import IconLoader from "@/components/Loader";
import SinglePlaylistDetail from "@/components/SinglePlaylistDetail";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

interface Playlist {
  external_urls: string;
  images: { width: number; height: number; url: string }[];
  name: string;
  owner: { display_name: string };
  tracks: {
    items: {
      track: {
        album: { artists: { name: string }[] };
        artists: { name: string }[];
        name: string;
        id: string;
      };
    }[];
  };
}

interface Averages {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  valence: number;
}

const PlaylistDetailPage = () => {
  const { data: session } = useSession();
  const [loading, isLoading] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist | undefined>();
  const [averages, setAverages] = useState<Averages | undefined>();
  const params = useParams();
  const router = useRouter();

  const avg = (data: any, property: any) => {
    const total = data.reduce((acc: any, obj: any) => acc + obj[property], 0);
    return total / data.length;
  };

  useEffect(() => {
    if (session === undefined) {
      router.push("/login");
    }

    const fetchPlaylist = async () => {
      try {
        isLoading(true);

        const userPlaylist = await fetch(
          `https://api.spotify.com/v1/playlists/${params.playlistId}`,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const playlistData = await userPlaylist.json();
        setPlaylist(playlistData);

        const trackIds = playlistData?.tracks.items.map(
          (item: any) => item.track.id
        );

        const audioFeatures = await fetch(
          `https://api.spotify.com/v1/audio-features?ids=${trackIds}
        `,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const audioFeaturesData = await audioFeatures.json();
        console.log("Audio Features =", audioFeaturesData);

        const averages: Averages = {
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          liveness: 0,
          speechiness: 0,
          valence: 0,
        };

        properties.forEach((property) => {
          averages[property as keyof Averages] = avg(audioFeaturesData.audio_features, property);
        });

        setAverages(averages);
      } catch (error) {
        console.error("Something went wrong...", error);
        isLoading(false);
      } finally {
        isLoading(false);
      }
    };

    fetchPlaylist();
  }, [params, session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <IconLoader />
      </div>
    );
  }
  return (
    <div className="w-full text-white xl:pl-44 pt-20 xl:pr-12 px-4 max-w-screen-xl m-auto">
      {playlist && (
        <SinglePlaylistDetail 
        // @ts-expect-error
        playlist={playlist} averages={averages} />
      )}
    </div>
  );
};

export default PlaylistDetailPage;
