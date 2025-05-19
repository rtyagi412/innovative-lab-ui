import AppLayout from "@/components/app-layout";
import FindPatient from "@/features/patient/components/FindPatient";
import { Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AppLoginPage } from "@/features/auth";
import ProtectedRoute from "./ProtectedRoute";
import { AppSignoutPage } from "@/features/auth/pages/AppSignoutPage";
import AddPatient from "@/features/patient/components/AddPatient";
import UpdatePatient from "@/features/patient/components/UpdatePatient";
import DeletePatient from "@/features/patient/components/DeletePatient";

export const AppRoutes = () => {
  const location = useLocation();
  console.log("📍 Current path in AppRoutes:", location.pathname);

  return (
    <Routes>
      <Route path="/login" element={<AppLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/patient/find" replace />} />
          <Route path="patient/find" element={<FindPatient />} />
          <Route path="patient/add" element={<AddPatient />} />
          <Route path="patient/update" element={<UpdatePatient />} />
          <Route path="patient/delete" element={<DeletePatient />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Route>
      <Route path="/signout" element={<AppSignoutPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
