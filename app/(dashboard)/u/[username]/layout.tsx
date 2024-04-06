import React from "react";
import { redirect } from "next/navigation";

import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

import { getSelfByUsername } from "@/lib/auth-service";

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
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
