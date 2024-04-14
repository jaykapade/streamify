import { format } from "date-fns";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { getBlockedUsers } from "@/lib/block-service";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();
  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.id,
    imageUrl: user.blocked?.imageUrl,
    username: user.blocked?.username,
    createdAt: user.blocked?.createdAt
      ? format(new Date(user.blocked?.createdAt), "dd/MM/yyyy")
      : "-",
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
