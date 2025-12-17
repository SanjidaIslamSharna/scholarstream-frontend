import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AllScholarships from "./pages/AllScholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';

// Dashboard Pages
import AddScholarship from "./pages/dashboard/admin/AddScholarship";
import ManageScholarships from "./pages/dashboard/admin/ManageScholarships";
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import Analytics from "./pages/dashboard/admin/Analytics";
import ModeratorApplications from "./pages/dashboard/moderator/ModeratorApplications";
import AllReviews from "./pages/dashboard/moderator/AllReviews";
import StudentApplications from "./pages/dashboard/student/StudentApplications";
import MyReviews from "./pages/dashboard/student/MyReviews";
import Profile from "./pages/dashboard/Profile";
import AdminRoute from "./routes/AdminRoute";
import ModeratorRoute from "./routes/ModeratorRoute";
import StudentRoute from "./routes/StudentRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import EditScholarship from "./pages/dashboard/admin/EditScholarship";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="scholarships" element={<AllScholarships />} />
          <Route path="scholarships/:id" element={<ScholarshipDetails />} />
          <Route
            path="checkout/:id"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="payment-success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="payment-fail"
            element={
              <PrivateRoute>
                <PaymentFail />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          {/* Common */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route
            path="add-scholarship"
            element={
              <AdminRoute>
                <AddScholarship />
              </AdminRoute>
            }
          />
          <Route
            path="manage-scholarships"
            element={
              <AdminRoute>
                <ManageScholarships />
              </AdminRoute>
            }
          />
          <Route
            path="edit-scholarship/:id"
            element={
              <AdminRoute>
                <EditScholarship />
              </AdminRoute>
            }
          />
          <Route
            path="manage-users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          />

          {/* Moderator */}
          <Route
            path="manage-applications"
            element={
              <ModeratorRoute>
                <ModeratorApplications />
              </ModeratorRoute>
            }
          />
          <Route
            path="reviews"
            element={
              <ModeratorRoute>
                <AllReviews />
              </ModeratorRoute>
            }
          />

          {/* Student */}
          <Route
            path="my-applications"
            element={
              <StudentRoute>
                <StudentApplications />
              </StudentRoute>
            }
          />
          <Route
            path="my-reviews"
            element={
              <StudentRoute>
                <MyReviews />
              </StudentRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <h1 className="p-10 text-center text-3xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
