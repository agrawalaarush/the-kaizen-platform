import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  updateUserDepartment,
  updateUserStatus,
} from "../../services/userService";
import toast from "react-hot-toast";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId,
    role
  ) => {
    try {
      await updateUserRole(
        userId,
        role,
        token
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
toast.error(
  error?.response?.data?.message ||
  "Failed to update role"
);    }
  };

  const handleDepartmentChange = async (
    userId,
    department
  ) => {
    try {
      await updateUserDepartment(
        userId,
        department,
        token
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
toast.error(
  error?.response?.data?.message ||
  "Failed to update department"
);    }
  };

  const handleStatusChange = async (
    userId,
    isActive
  ) => {
    try {
      await updateUserStatus(
        userId,
        isActive,
        token
      );

      fetchUsers();
    } catch (error) {
      console.error(error);

      toast.error(
  error?.response?.data?.message ||
    "Failed to update status"
);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Users
        </h1>

        <p className="text-gray-500 mt-1">
          Manage user roles, departments and
          account status
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      defaultValue={
                        user.department
                      }
                      id={`department-${user._id}`}
                      className="
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-3
                        py-2
                        bg-white
                        text-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    >
                      <option value="General">
                        General
                      </option>

                      <option value="Technology">
                        Technology
                      </option>

                      <option value="Operations">
                        Operations
                      </option>

                      <option value="HR">
                        HR
                      </option>

                      <option value="Finance">
                        Finance
                      </option>

                      <option value="Customer Service">
                        Customer Service
                      </option>

                      <option value="Risk & Compliance">
                        Risk & Compliance
                      </option>

                      <option value="Marketing">
                        Marketing
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      defaultValue={user.role}
                      id={`role-${user._id}`}
                      className="
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        px-3
                        py-2
                        bg-white
                        text-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    >
                      <option value="Employee">
                        Employee
                      </option>

                      <option value="Reviewer">
                        Reviewer
                      </option>

                      <option value="Admin">
                        Admin
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      defaultValue={
                        user.isActive
                          ? "true"
                          : "false"
                      }
                      id={`status-${user._id}`}
                      className={`w-full rounded-xl px-3 py-2 text-sm border ${
                        user.isActive
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      <option value="true">
                        Active
                      </option>

                      <option value="false">
                        Inactive
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        await handleRoleChange(
                          user._id,
                          document.getElementById(
                            `role-${user._id}`
                          ).value
                        );

                        await handleDepartmentChange(
                          user._id,
                          document.getElementById(
                            `department-${user._id}`
                          ).value
                        );

                        await handleStatusChange(
                          user._id,
                          document.getElementById(
                            `status-${user._id}`
                          ).value ===
                            "true"
                        );
                        toast.success(
  "User updated successfully"
);
                      }}
                      className="
                        bg-[#1A56DB]
                        hover:bg-[#1748B5]
                        text-white
                        font-medium
                        px-5
                        py-2
                        rounded-xl
                        transition
                        shadow-sm
                      "
                    >
                      Update
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
};

export default UserManagementPage;