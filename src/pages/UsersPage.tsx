import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface User {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "ADMIN" | "FACILITATOR";
  isActive: boolean;
  createdAt: string;
}

function getRoleClasses(role: User["role"]) {
  switch (role) {
    case "ADMIN":
      return "bg-blue-100 text-blue-700";
    case "FACILITATOR":
      return "bg-teal-100 text-teal-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusClasses(isActive: boolean) {
  return isActive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users");
        const data = res?.data.data;
        console.log("Fetched users:", data);
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <div className="mt-6 w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Users</h2>
            <p className="text-sm text-gray-500">
              Manage administrators and facilitators
            </p>
          </div>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "12px",
              px: 2.5,
              textTransform: "none",
              boxShadow: "none",
              backgroundColor: "#111827",
              "&:hover": {
                backgroundColor: "#1f2937",
                boxShadow: "none",
              },
            }}
          >
            New User
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TextField
            size="small"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              minWidth: { xs: "100%", md: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
              },
            }}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="FACILITATOR">Facilitator</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Table */}
        <UsersTable users={filteredUsers} loading={loading} totalUsers={users.length} />
      </div>
    </div>
  );
}

function UsersTable({
  users,
  loading,
  totalUsers,
}: {
  users: User[];
  loading: boolean;
  totalUsers: number;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">System Users</h3>
          <p className="text-sm text-gray-500">
            View and manage all registered platform users.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
          Total: {totalUsers}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#fafafa] text-gray-600">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">
                    Loading users...
                  </td>
                </tr>
              )}

              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}

              {!loading &&
                users.map((user) => (
                  <tr key={user.email} className="transition hover:bg-gray-50/80">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {user.fullName}
                    </td>

                    <td className="max-w-[240px] px-4 py-4 text-gray-600">
                      <p className="truncate">{user.email}</p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {user.phoneNumber}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleClasses(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          user.isActive
                        )}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}