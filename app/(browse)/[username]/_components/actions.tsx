"use client";

import React, { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ActionProps = {
  isFollowing: boolean;
  userId: string;
};

const Actions = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data?.following.username}`)
        )
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data?.following.username}`)
        )
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Button
      variant={isFollowing ? "destructive" : "primary"}
      disabled={isPending}
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;
