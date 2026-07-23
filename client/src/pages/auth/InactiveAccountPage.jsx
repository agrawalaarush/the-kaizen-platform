import { useAuth } from "../../context/AuthContext";

function InactiveAccountPage() {
  const { inactiveInfo } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">

        <div className="text-6xl mb-4">
          ⚠️
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Account Inactive
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          {inactiveInfo?.message ||
            "Your Kaizen account has been marked as inactive."}
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Need Help?
          </h2>

          <p className="mt-2 text-gray-600">
            Please contact your system administrator to regain access.
          </p>

          <p className="mt-4 text-blue-600 font-semibold break-all">
            {inactiveInfo?.adminEmail ||
              "No active administrator available"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default InactiveAccountPage;