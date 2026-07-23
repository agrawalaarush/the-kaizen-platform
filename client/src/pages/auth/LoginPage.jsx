import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage({
  onSwitchToRegister,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const {
    setUser,
    setInactiveInfo,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data.user);

      toast.success(
        "Login successful!"
      );

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );

      if (error.response?.data?.inactive) {

        setInactiveInfo({
          message:
            error.response.data.message,
          adminEmail:
            error.response.data.adminEmail,
        });

        navigate("/inactive", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h1 className="text-2xl font-bold mb-6">
          OSB Kaizen
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>

      </form>

    </div>
  );
}

export default LoginPage;