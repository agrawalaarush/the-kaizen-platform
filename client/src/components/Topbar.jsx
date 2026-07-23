import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1
  onClick={() => navigate("/")}
  className="text-base font-medium text-gray-900 cursor-pointer hover:text-[#1A56DB] transition-colors"
>
  Hello, {user?.name} 👋
</h1>

      {user?.role !== "Admin" && (
        <button
  onClick={() => navigate("/submit-idea")}
  className="flex items-center gap-2 bg-[#1A56DB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200"
>
  <span className="text-lg leading-none">+</span>
  <span>New Idea</span>
</button>
      )}
    </div>
  );
}

export default Topbar;