import React from "react";
import Navbar from "./_components/navbar";

type BrowseLayoutProps = {
  children: React.ReactNode;
};

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default BrowseLayout;
