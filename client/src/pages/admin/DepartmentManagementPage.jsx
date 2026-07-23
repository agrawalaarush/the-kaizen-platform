import { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
} from "../../services/departmentService";
import toast from "react-hot-toast";

function DepartmentManagementPage() {
  const [departments, setDepartments] =
    useState([]);

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const token =
    localStorage.getItem("token");

  const fetchDepartments = async () => {
    try {
      const data =
        await getAllDepartments(token);

      setDepartments(data.departments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDepartment(
        {
          name,
          description,
        },
        token
      );

      setName("");
      setDescription("");

      fetchDepartments();

      toast.success(
  "Department created successfully"
);
    } catch (error) {
      console.error(error);

      toast.error(
  error.response?.data?.message ||
    "Failed to create department"
);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Departments
        </h1>

        <p className="text-gray-500 mt-1">
          Create and manage departments
          across the Kaizen platform
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8"
      >
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department Name
          </label>

          <input
            type="text"
            placeholder="e.g. Technology"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-[#1A56DB]
            "
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Briefly describe this department..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-[#1A56DB]
            "
          />
        </div>

        <button
          type="submit"
          className="
            bg-[#1A56DB]
            hover:bg-[#1748B5]
            text-white
            font-medium
            px-6
            py-3
            rounded-xl
            shadow-sm
            transition
          "
        >
          + Add Department
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {departments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No departments found
          </div>
        ) : (
          departments.map((department) => (
            <div
              key={department._id}
              className="
                flex
                items-start
                justify-between
                gap-4
                p-5
                border-b
                border-gray-100
                hover:bg-gray-50
                transition
              "
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {department.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  {department.description ||
                    "No description provided"}
                </p>
              </div>

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  text-[#1A56DB]
                  font-bold
                "
              >
                {department.name?.charAt(0)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DepartmentManagementPage;