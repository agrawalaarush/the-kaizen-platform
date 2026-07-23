import { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

function RegisterPage({
  onSwitchToLogin,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      await registerUser(
        email,
        password
      );

      toast.success(
        "Registration successful. Please sign in."
      );

      onSwitchToLogin();
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
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
          placeholder="OSB Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={
            confirmPassword
          }
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={
              onSwitchToLogin
            }
            className="text-blue-600"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;