import UserProfile from "@/components/UserProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [profile, setProfile] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user || session.status === "unauthenticated") {
      router.push("/login");
    }

    if (session && session.accessToken) {
      setToken(session.accessToken);
      // console.log("HOME SESSION = ", session);
    }

    const fetchProfile = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error with Spotify API: ", error)
      }

      const data = await response.json();

      setProfile(data);
      console.log("Data from Spotify = ", data)
      return data;
    };

    fetchProfile();
  }, [session]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <UserProfile profile={profile} />
      <p className="text-white">Token is: {token}</p>
    </div>
  );
}
