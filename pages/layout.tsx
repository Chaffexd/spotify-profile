import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import SessionProvider from "../components/SessionProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex sm:flex-row flex-col h-screen w-full">
        <Navbar />
        {children}
        <MobileNav />
      </main>
    </>
  );
}
