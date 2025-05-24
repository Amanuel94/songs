import App from "App";
import RegisterForm from "pages/register";
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
]);

export default router;
