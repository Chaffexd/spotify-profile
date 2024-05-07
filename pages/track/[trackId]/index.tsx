import IconLoader from "@/components/Loader";
import TrackDetail from "@/components/TrackDetail";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TrackDetailPage = () => {
  const params = useParams();
  const [loading, isLoading] = useState(false);
  const [trackData, setTrackData] = useState();
  const [trackAnalysis, setTrackAnalysis] = useState();
  const [trackFeatures, setTrackFeatures] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        isLoading(true);
        const fetchTrack = await fetch(
          `https://api.spotify.com/v1/tracks/${params.trackId}`,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const trackResponse = await fetchTrack.json();
        setTrackData(trackResponse);

        const fetchAnalysis = await fetch(
          `https://api.spotify.com/v1/audio-analysis/${params.trackId}`,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const analysisResponse = await fetchAnalysis.json();
        setTrackAnalysis(analysisResponse);

        const fetchFeatures = await fetch(
          `https://api.spotify.com/v1/audio-features/${params.trackId}`,
          {
            method: "GET",
            headers: {
              // @ts-expect-error
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const featuresResponse = await fetchFeatures.json();
        setTrackFeatures(featuresResponse);
      } catch (error) {
        console.error("Something went wrong...", error);
        isLoading(false);
      } finally {
        isLoading(false);
      }
    };

    fetchTrackData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <IconLoader />
      </div>
    );
  }

  return (
    <TrackDetail
      // @ts-expect-error
      trackData={trackData}
      // @ts-expect-error
      trackAnalysis={trackAnalysis}
      // @ts-expect-error
      trackFeatures={trackFeatures}
    />
  );
};

export default TrackDetailPage;
