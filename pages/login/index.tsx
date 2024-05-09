import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // @ts-ignore
  if (session?.accessToken) {
    router.push("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {session ? (
        <button
          className="border border-white border-solid p-2 w-28 h-10 rounded-full hover:bg-white hover:text-black text-white"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          SIGN OUT
        </button>
      ) : (
        <button
          className="border border-white border-solid p-2 w-48 h-10 rounded-full hover:bg-white hover:text-black text-white"
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
        >
          Sign in with Spotify
        </button>
      )}
    </div>
  );
};

export default LoginPage;
