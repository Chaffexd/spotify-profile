import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { useSession } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <>
      <main className="flex sm:flex-row flex-col h-screen w-full">
        {session.status === "authenticated" && <Navbar />}
        {children}
        {session.status === "authenticated" && <MobileNav />}
      </main>
    </>
  );
}
