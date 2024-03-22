import React from "react";
import { BrowserRouter as Router, Route, RouterProvider ,createBrowserRouter } from "react-router-dom";

// Pages & Layouts
import DashboardLayout from "./routes/DashboardLayout";
import HomePage from "./pages/Home/Home";
import Editor from "./pages/Editor/App";


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    path: "/studio",
    element: <Editor />
  }
]);

export default () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};