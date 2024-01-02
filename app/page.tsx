import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <p className="flex flex-col gap-4">
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </p>
  );
}
