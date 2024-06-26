"use client";
import React, { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";

import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";

import { useSideBar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  // Fixing Hydration error
  const isClient = useIsClient();
  const { collapsed } = useSideBar((state) => state);

  if (!isClient)
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50"
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
