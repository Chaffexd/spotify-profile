import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

type TrackFeaturesProps = {
  trackFeatures: {
    acousticness: {};
    danceability: {};
    energy: {};
    instrumentalness: {};
    liveness: {};
    speechiness: {};
    valence: {};
  };
};

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

const FeatureChart = ({ trackFeatures }: TrackFeaturesProps) => {
  console.log("Track Features = ", trackFeatures);
  let myChart = null;

  const {
    acousticness,
    danceability,
    energy,
    instrumentalness,
    liveness,
    speechiness,
    valence,
  } = trackFeatures || {};

  useEffect(() => {
    const ctx = document.getElementById("chart");

    // @ts-expect-error
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: properties,
        datasets: [
          {
            label: "Features",
            data: [
              acousticness,
              danceability,
              energy,
              instrumentalness,
              liveness,
              speechiness,
              valence,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(255, 159, 64, 0.3)",
              "rgba(255, 206, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(104, 132, 245, 0.3)",
              "rgba(153, 102, 255, 0.3)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(104, 132, 245, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: "Audio Features",
            color: "white",
            font: { weight: "bold", size: "24px" },
          },
        },
        scales: {
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            ticks: {
              color: "white",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            ticks: {
              color: "white",
            },
          },
        },
      },
    });
  }, [trackFeatures]);

  return (
    <>
      <canvas
        id="chart"
        width={200}
        height={200}
        className="my-12"
      />
      <Link
        href={
          "https://developer.spotify.com/documentation/web-api/reference/get-audio-features"
        }
        target="_blank"
        className="mb-20 mt-4 hover:underline"
      >
        Full Description of Spotify's Audio Features
      </Link>
    </>
  );
};

export default FeatureChart;
