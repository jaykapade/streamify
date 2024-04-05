"use client";

import React, { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock, onUnBlock } from "@/actions/block";

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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data?.blocked?.username}`)
        )
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <>
      <Button
        variant={isFollowing ? "destructive" : "primary"}
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};

export default Actions;
