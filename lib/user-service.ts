import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};
