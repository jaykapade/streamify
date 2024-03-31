"use client";
import React from "react";

import { useSideBar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSideBar((state) => state);
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
