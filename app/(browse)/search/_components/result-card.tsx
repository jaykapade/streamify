import Link from "next/link";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import VerifiedMark from "@/components/verified-mark";

type ResultCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
};

export const ResultCard = ({
  data: { id, name, thumbnailUrl, isLive, user, updatedAt },
}: ResultCardProps) => {
  return (
    <Link href={`/${user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem] overflow-hidden rounded-md">
          <Thumbnail
            src={thumbnailUrl}
            fallback={user.imageUrl}
            isLive={isLive}
            username={user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{name} </p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => (
  <div className="w-full flex gap-x-4">
    <div className="relative h-[9rem] w-[16rem]">
      <ThumbnailSkeleton />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
);
