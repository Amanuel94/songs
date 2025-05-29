import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import "styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import { store } from "store/store";
import { Provider } from "react-redux";

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
