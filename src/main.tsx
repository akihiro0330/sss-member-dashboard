import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import "./index.css";

import App from "./App";

import {
  UIProvider,
} from "./context/UIContext";

import {
  NavigationProvider,
} from "./context/NavigationContext";

import {
  ToastProvider,
} from "./context/ToastContext";

import {
  NotificationProvider,
} from "./context/NotificationContext";

createRoot(
  document.getElementById(
    "root",
  )!,
).render(
  <StrictMode>
    <UIProvider>
      <NavigationProvider>
        <ToastProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ToastProvider>
      </NavigationProvider>
    </UIProvider>
  </StrictMode>,
);