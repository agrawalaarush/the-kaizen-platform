import { useState, useEffect } from "react";
import { createIdea } from "../../services/ideaService";
import { getAllCategories } from "../../services/categoryService";
import { getAllDepartments } from "../../services/departmentService";
import toast from "react-hot-toast";

function SubmitIdeaPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    department: "",
  });

  const [categories, setCategories] =
    useState([]);

  const [departments, setDepartments] =
    useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const categoryData =
          await getAllCategories(token);

        const departmentData =
          await getAllDepartments(token);

        setCategories(
          categoryData.categories
        );

        setDepartments(
          departmentData.departments
        );

        console.log(
  "Categories:",
  categoryData
);

console.log(
  "Departments:",
  departmentData
);
        {categories.map((category) => (
  <option
    key={category._id}
    value={category.name}
  >
    {category.name}
  </option>
))}
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await createIdea(
        formData,
        token
      );

      console.log(response);

toast.success("Idea submitted successfully");
      setFormData({
        title: "",
        description: "",
        category: "",
        department: "",
      });
    } catch (error) {
      console.error(error);

toast.error(
  error.response?.data?.message ||
  "Failed to submit idea"
);    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Submit New Idea
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((department) => (
              <option
                key={department._id}
                value={department.name}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
}

export default SubmitIdeaPage;