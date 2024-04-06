import React from "react";
import { redirect } from "next/navigation";

import Navbar from "./_components/navbar";

import { getSelfByUsername } from "@/lib/auth-service";
import { Sidebar } from "./_components/sidebar";

type CreatorLayoutProps = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

const CreatorLayout = async ({
  children,
  params: { username },
}: CreatorLayoutProps) => {
  const self = await getSelfByUsername(username);

  if (!self) redirect("/");

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default CreatorLayout;
