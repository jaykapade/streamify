import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  let userId;

  try {
    userId = (await getSelf())?.id;
  } catch (error) {
    userId = null;
  }
  let users = [];
  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
