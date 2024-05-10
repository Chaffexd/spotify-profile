import { useEffect, useState } from "react";

export function useHttp(url: string, token: string) {
  const [test, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [url]);

  return { test, error, loading };
}
