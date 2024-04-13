"use client";

import { cn, stringToColor } from "@/lib/utils";
import React, { useTransition } from "react";
import Hint from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  participantName: string;
  participantIdentity: string;
};

const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`You have blocked ${participantName}`);
        })
        .catch((error: any) => {
          toast.error(error.message || "Something went wrong");
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block user">
          <Button
            variant="ghost"
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
            disabled={isPending}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
