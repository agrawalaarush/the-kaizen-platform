import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } =
    useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/", {
      replace: true,
    });
  };

  const getLinkClass = (path) =>
    location.pathname === path
      ? "block bg-indigo-50 text-[#1A56DB] rounded-lg px-3 py-2 text-sm mb-1"
      : "block px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg";

  return (
    <div className="w-[220px] h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
<div
  onClick={() => navigate("/")}
  className="flex items-center gap-3 px-5 py-5 cursor-pointer hover:opacity-90 transition-opacity"
>        <div className="w-8 h-8 bg-[#1A56DB] rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105">
  💡
</div>

        <span className="text-sm font-medium">
          OSB Kaizen
        </span>
      </div>

      {/* Menu */}
      <div className="px-3">

        <p className="text-[10px] uppercase text-gray-400 px-2 mb-2">
          Main
        </p>

        <Link
          to="/"
          className={getLinkClass("/")}
        >
          Dashboard
        </Link>

        {/* Employee + Reviewer */}
        {user?.role !== "Admin" && (
          <>
            <Link
              to="/submit-idea"
              className={getLinkClass(
                "/submit-idea"
              )}
            >
              Submit Idea
            </Link>

            <Link
              to="/my-ideas"
              className={getLinkClass(
                "/my-ideas"
              )}
            >
              My Ideas
            </Link>

            <Link
              to="/volunteered"
              className={getLinkClass(
                "/volunteered"
              )}
            >
              Volunteered
            </Link>
          </>
        )}

        {/* Everyone */}
        <Link
          to="/all-ideas"
          className={getLinkClass(
            "/all-ideas"
          )}
        >
          All Ideas
        </Link>

        {/* Reviewer + Admin */}
        {user?.role !== "Employee" && (
          <>
            <Link
              to="/pending-ideas"
              className={getLinkClass(
                "/pending-ideas"
              )}
            >
              Pending Ideas
            </Link>

            <Link
              to="/reviewed-ideas"
              className={getLinkClass(
                "/reviewed-ideas"
              )}
            >
              My Reviewed Ideas
            </Link>
          </>
        )}

        {/* Admin Only */}
        {user?.role === "Admin" && (
          <>
            <Link
              to="/admin/users"
              className={getLinkClass(
                "/admin/users"
              )}
            >
              Manage Users
            </Link>

            <Link
              to="/admin/categories"
              className={getLinkClass(
                "/admin/categories"
              )}
            >
              Manage Categories
            </Link>

            <Link
              to="/admin/departments"
              className={getLinkClass(
                "/admin/departments"
              )}
            >
              Manage Departments
            </Link>
          </>
        )}

      </div>

      {/* Logout */}
      <div className="mt-auto p-3">
        <div
          onClick={handleLogout}
          className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 rounded-lg"
        >
          Logout
        </div>
      </div>

    </div>
  );
}

export default Sidebar;