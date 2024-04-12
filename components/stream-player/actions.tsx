"use client";

import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";

type ActionProps = {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
};

export const Actions = ({ isFollowing, isHost, hostIdentity }: ActionProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => {
          toast.success(`You are now following ${data?.following.username}`);
        })
        .catch((error: any) => {
          toast.error(error.message || "Something went wrong");
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => {
          toast.success(`You have unfollowed ${data?.following.username}`);
        })
        .catch((error: any) => {
          toast.error(error.message || "Something went wrong");
        });
    });
  };

  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");
    if (isHost) return;
    if (isFollowing) {
      return handleUnfollow();
    } else {
      return handleFollow();
    }
  };
  return (
    <Button
      variant="primary"
      onClick={toggleFollow}
      size="sm"
      className="w-full lg:w-auto"
      disabled={isPending}
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
