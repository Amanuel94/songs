import App from "App";
import RegisterForm from "pages/register";
import React from "react";
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/register",
    Component: RegisterForm,
  },
  {
    path: "/login",
    Component: React.lazy(() => import("pages/login"))
  }
]);

export default router;
