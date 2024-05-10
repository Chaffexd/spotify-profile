import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <>
      <Head>
        <title>Spotify Profile</title>
        <meta name="description" content="A spotify profile based on your account" />
      </Head>
      <main className="flex sm:flex-row flex-col h-full w-full overflow-auto">
        {session.status === "authenticated" && <Navbar />}
        {children}
        {session.status === "authenticated" && <MobileNav />}
      </main>
    </>
  );
}
