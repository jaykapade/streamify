"use client";

import React from "react";
import { User } from "@prisma/client";
import { useSideBar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

type RecommendedProps = {
  data: User[];
};

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSideBar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
