import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const user = await getUserByUsername(username);
  if (!user) notFound();
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    <>
      <div>{user?.username}</div>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </>
  );
};

export default UserPage;
