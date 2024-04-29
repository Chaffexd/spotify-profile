import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginPage = () => {
  const { data: session } = useSession();

  console.log("Session = ", session);

  return (
    <>
      {session ? (
        <button
          className="border border-white border-solid p-2 w-28 h-10 rounded-full hover:bg-white hover:text-black mt-8 text-white"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          SIGN OUT
        </button>
      ) : (
        <button
          className="border border-white border-solid p-2 w-28 h-10 rounded-full hover:bg-white hover:text-black mt-8 text-white"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          SIGN IN
        </button>
      )}
    </>
  );
};

export default LoginPage;
