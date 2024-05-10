import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useHttp(url: string, token: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session === undefined) {
      router.push("/login");
    }
    async function getData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Something went wrong...", response)
        }

        const userData = await response.json();
        setData(userData);
        console.log("USER DATA IN HOOK = ", userData);
      } catch (error) {
        // @ts-expect-error
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [url, session]);

  return { data, error, loading };
}
