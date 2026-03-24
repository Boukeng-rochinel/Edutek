import { createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AdmissionManagement from "./pages/AdmissionManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import TimetableManagement from "./pages/TimetableManagement";
import ExaminationSystem from "./pages/ExaminationSystem";
import TransportationManagement from "./pages/TransportationManagement";
import ParentPortal from "./pages/ParentPortal";
import Gradebook from "./pages/Gradebook";
import Login from "./pages/Login";
import Apps from "./pages/Apps";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import FeesManagement from "./pages/FeesManagement";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "students", Component: StudentManagement },
      { path: "admissions", Component: AdmissionManagement },
      { path: "attendance", Component: AttendanceManagement },
      { path: "timetable", Component: TimetableManagement },
      { path: "examinations", Component: ExaminationSystem },
      { path: "transportation", Component: TransportationManagement },
      { path: "parent-portal", Component: ParentPortal },
      { path: "gradebook", Component: Gradebook },
      { path: "apps", Component: Apps },
      { path: "settings", Component: Settings },
      { path: "profile", Component: UserProfile },
      { path: "fees", Component: FeesManagement },
    ],
  },
]);