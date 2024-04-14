import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { onUnBlock } from "@/actions/block";

type UnblockButtonProps = { userId: string };

const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) =>
          toast.success(`User ${result.blocked?.username} has been unblocked`)
        )
        .catch((error: any) =>
          toast.error(error.message || "Something went wrong")
        );
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};

export default UnblockButton;
