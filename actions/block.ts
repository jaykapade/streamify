"use server";

import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_TOKEN!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Adapt to kick the guest

  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (error) {
    // User is guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {
    // User not in room
  }
  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unblockUser(id);
  revalidatePath("/");
  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocked?.username}`);
  }
  return unBlockedUser;
};
