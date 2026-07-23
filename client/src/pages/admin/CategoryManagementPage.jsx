import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
} from "../../services/categoryService";
import toast from "react-hot-toast";

const CategoryManagementPage = () => {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const token =
    localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const data =
        await getAllCategories(token);

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(
        {
          name,
          description,
        },
        token
      );

      setName("");
      setDescription("");

      fetchCategories();

      toast.success(
  "Category created successfully"
);
    } catch (error) {
      console.error(error);

     toast.error(
  error.response?.data?.message ||
    "Failed to create category"
);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Categories
        </h1>

        <p className="text-gray-500 mt-1">
          Create and manage idea categories
          across the Kaizen platform
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8"
      >
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category Name
          </label>

          <input
            type="text"
            placeholder="e.g. Automation"
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
            placeholder="Briefly describe what this category covers..."
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
          + Add Category
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories found
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
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
                  {category.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  {category.description ||
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
                {category.name?.charAt(0)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManagementPage;