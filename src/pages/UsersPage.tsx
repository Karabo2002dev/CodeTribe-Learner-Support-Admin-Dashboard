import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/* ================= TYPES ================= */

interface User {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "ADMIN" | "FACILITATOR";
  isActive: boolean;
  createdAt: string;
}

/* ================= PAGE ================= */

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ===== Fetch Users ===== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users");
        console.log("API Response for /users:", res);
        console.log("Fetched users:", res.data);

        const data = res?.data?.data;
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

  /* ===== Filtering Logic ===== */
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Users
          </h2>
          <p className="text-sm text-gray-500">
            Manage administrators and facilitators
          </p>
        </div>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          sx={{ borderRadius: "999px", px: 3 }}
        >
          New User
        </Button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <TextField
          size="small"
          placeholder="Search name or email"
          className="w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <FormControl size="small" className="w-40">
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

          <FormControl size="small" className="w-40">
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

      {/* ===== TABLE ===== */}
      <UsersTable
        users={filteredUsers}
        loading={loading}
      />
    </div>
  );
}

/* ================= TABLE COMPONENT ================= */

function UsersTable({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">
        System Users
      </h3>

      <div className="border border-green-200 rounded-xl overflow-x-auto max-h-[420px]">
        <table className="min-w-full text-sm">
          <thead className="bg-green-100 sticky top-0 z-10">
            <tr className="text-gray-700">
              <th className="px-4 py-3 text-left font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-green-200">
            {loading && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  Loading users…
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              users.map((user) => (
                <tr
                  key={user.email}
                  className="hover:bg-green-50 transition"
                >

                  <td className="px-4 py-4 font-medium text-gray-900">
                    {user.fullName}
                  </td>

                  <td className="px-4 py-4 text-gray-600 truncate max-w-[220px]">
                    {user.email}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {user.phoneNumber}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button className="text-green-600 text-xs font-medium hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}