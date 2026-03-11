import { getAllUsersAction } from "@/actions/userAction";
import UserTable from "@/app/components/dashboard/back-office/UserTable";

export default async function AdminUsersPage() {
  const result = await getAllUsersAction();
  const users = (result.success && "data" in result && result.data) ? result.data : [];

  return (
    <UserTable initialUsers={users} />
  );
}