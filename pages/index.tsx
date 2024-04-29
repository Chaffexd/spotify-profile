import UserProfile from "@/components/UserProfile";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <UserProfile />
    </div>
  );
}