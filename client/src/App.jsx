import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import IdeaDetailsPage from "./pages/shared/IdeaDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import InactiveAccountPage from "./pages/auth/InactiveAccountPage";

import DashboardPage from "./pages/employee/DashboardPage";
import SubmitIdeaPage from "./pages/employee/SubmitIdeaPage";
import MyIdeasPage from "./pages/employee/MyIdeasPage";
import VolunteeredPage from "./pages/employee/VolunteeredPage";

import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard";
import PendingIdeasPage from "./pages/reviewer/PendingIdeasPage";
import MyReviewedIdeasPage from "./pages/reviewer/MyReviewedIdeasPage";

import AllIdeasPage from "./pages/shared/AllIdeasPage";

import UserManagementPage from "./pages/admin/UserManagementPage";
import CategoryManagementPage from "./pages/admin/CategoryManagementPage";
import DepartmentManagementPage from "./pages/admin/DepartmentManagementPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

import MainLayout from "./layouts/MainLayout";
import { useState } from "react";

function App() {
  const {
    user,
    inactiveInfo,
  } = useAuth();

  const [showRegister, setShowRegister] =
    useState(false);

  // Show inactive account page
  if (inactiveInfo) {
    return <InactiveAccountPage />;
  }

  // Login/Register
  if (!user) {
    return showRegister ? (
      <RegisterPage
        onSwitchToLogin={() =>
          setShowRegister(false)
        }
      />
    ) : (
      <LoginPage
        onSwitchToRegister={() =>
          setShowRegister(true)
        }
      />
    );
  }

  return (
    <MainLayout>
      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            user.role === "Admin" ? (
              <AdminDashboard />
            ) : user.role === "Reviewer" ? (
              <ReviewerDashboard />
            ) : (
              <DashboardPage />
            )
          }
        />

        {/* Shared */}
        <Route
          path="/all-ideas"
          element={<AllIdeasPage />}
        />

        <Route
          path="/ideas/:id"
          element={<IdeaDetailsPage />}
        />

        {/* Employee */}
        <Route
          path="/submit-idea"
          element={<SubmitIdeaPage />}
        />

        <Route
          path="/my-ideas"
          element={<MyIdeasPage />}
        />

        <Route
          path="/volunteered"
          element={<VolunteeredPage />}
        />

        {/* Reviewer */}
        <Route
          path="/pending-ideas"
          element={
            user.role === "Reviewer" ||
            user.role === "Admin" ? (
              <PendingIdeasPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/reviewed-ideas"
          element={
            user.role === "Reviewer" ||
            user.role === "Admin" ? (
              <MyReviewedIdeasPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin/users"
          element={
            user.role === "Admin" ? (
              <UserManagementPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/admin/categories"
          element={
            user.role === "Admin" ? (
              <CategoryManagementPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/admin/departments"
          element={
            user.role === "Admin" ? (
              <DepartmentManagementPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Unknown Routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;