import Image from "next/image";
import Link from "next/link";
import React from "react";

type TrackDataProps = {
  trackData: {
    album: {
      artists: {
        name: string;
      }[];
      external_urls: {
        spotify: string;
      };
      images: {
        width: number;
        height: number;
        url: string;
      }[];
      name: string;
    };
    name: string;
    popularity: number
  };
  trackAnalysis: {
    track: {
        duration: number
        key: number
        time_signature: number
        tempo: number
        mode: number
    }
    bars: {}[]
    beats: {}[]
    segments: {}[]
    sections: {}[]
  };
  trackFeatures: {};
};

const pitchClasses = [
    {
        0: "C"
    },
    {
        1: "C♯"
    },
    {
        2: "D"
    },
    {
        3: "D♯"
    },
    {
        4: "E"
    },
    {
        5: "F"
    },
    {
        6: "F♯"
    },
    {
        7: "G"
    },
    {
        8: "G♯"
    },
    {
        9: "A"
    },
    {
        10: "B♭"
    },
    {
        11: "B"
    }
]

const TrackDetail = ({
  trackData,
  trackAnalysis,
  trackFeatures,
}: TrackDataProps) => {
  console.log("Track Analysis = ", trackAnalysis);
  console.log("Track Data = ", trackData);
  // console.log("Track Features = ", trackFeatures);

  // duration, key, modality, time signature, tempo (BPM) --
  // popularity, bars, beats, sections, segments

  const { popularity } = trackData || {};
  const { track, bars, beats, segments, sections } = trackAnalysis || {};

  const { duration, key, time_signature, tempo, mode } = track || {};

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  function getPitchClass(key: number) {
    const pitchIndex = key % 12;
    // @ts-expect-error
    return pitchClasses.find(pitch => Object.keys(pitch)[0] == pitchIndex)[pitchIndex];
  }

  return (
    <div className="w-full h-screen text-white pl-44 pt-20 pr-12">
      <div className="flex gap-8">
        <Image
          src={trackData?.album?.images[1]?.url}
          width={trackData?.album?.images[1]?.width}
          height={trackData?.album?.images[1]?.height}
          alt={`Image of ${trackData?.album?.artists[0]?.name}`}
        />
        <div>
          <p className="text-6xl font-bold mb-2">{trackData?.name}</p>
          <p className="text-2xl text-slate-400 mb-2">
            {trackData?.album?.artists[0]?.name}
          </p>
          <p className="text-2xl text-slate-400 mb-8">
            {trackData?.album?.name}
          </p>
          <Link
            href={trackData?.album?.external_urls?.spotify || ""}
            target="_blank"
            className="bg-green-600 rounded-full py-3 px-8 hover:bg-green-800"
          >
            Play on Spotify
          </Link>
        </div>
      </div>
      <div className="mt-12 flex items-center flex-col">
        <div className="flex-row flex">
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{`${minutes}:${seconds.toFixed(0)}`}</p>
            <p>Duration</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{getPitchClass(key)}</p>
            <p>Key</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{mode === 0 ? "Minor" : "Major"}</p>
            <p>Modality</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{time_signature}</p>
            <p>Time Signature</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{Math.ceil(tempo)}</p>
            <p>Tempo (BPM)</p>
          </div>
        </div>
        <div className="flex-row flex">
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{popularity}%</p>
            <p>Popularity</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{bars.length}</p>
            <p>Bars</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{beats.length}</p>
            <p>Beats</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{sections.length}</p>
            <p>Sections</p>
          </div>
          <div className="border border-slate-200 text-center py-4 w-40">
            <p className="font-bold text-2xl">{segments.length}</p>
            <p>Segments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
