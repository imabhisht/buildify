import React from "react";
import { BrowserRouter as Router, Route, RouterProvider ,createBrowserRouter } from "react-router-dom";

// Pages & Layouts
import DashboardLayout from "./routes/DashboardLayout";
import HomePage from "./pages/Home/Home";
import Editor from "./pages/Editor/App";
import ProjectPage from "./pages/Project/Projects";
import LoginPage from "./pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project", element: <ProjectPage /> },
    ],
  },
  {
    path: "/studio",
    element: <Editor />
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

export default () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};