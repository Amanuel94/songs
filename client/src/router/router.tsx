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
  },
  {
    path: "/add-song",
    Component: React.lazy(() =>
      import("pages/songForm").then(module => ({
        default: () => <module.default title="" artist="" album="" genre="" />
      }))
    )
  },
  {
    path: "/dashboard",
    Component: React.lazy(() => import("pages/dashboard"))
  }
]);

export default router;
