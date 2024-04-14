import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          thumbnailUrl: true,
          name: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return user;
};
