// src/context/DarkModeContext.js
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.style.setProperty("--color-grey-0", "#1f2937");
      document.documentElement.style.setProperty("--color-grey-50", "#374151");
      document.documentElement.style.setProperty("--color-grey-100", "#4b5563");
      document.documentElement.style.setProperty("--color-grey-200", "#6b7280");
      document.documentElement.style.setProperty("--color-grey-300", "#9ca3af");
      document.documentElement.style.setProperty("--color-grey-400", "#d1d5db");
      document.documentElement.style.setProperty("--color-grey-500", "#e5e7eb");
      document.documentElement.style.setProperty("--color-grey-600", "#f3f4f6");
      document.documentElement.style.setProperty("--color-grey-700", "#f9fafb");
      document.documentElement.style.setProperty("--color-grey-800", "#ffffff");
      document.documentElement.style.setProperty(
        "--color-blue-700",
        "#e6e6e6 ",
      );
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.style.setProperty("--color-grey-0", "#ffffff");
      document.documentElement.style.setProperty("--color-grey-50", "#f9fafb");
      document.documentElement.style.setProperty("--color-grey-100", "#f3f4f6");
      document.documentElement.style.setProperty("--color-grey-200", "#e5e7eb");
      document.documentElement.style.setProperty("--color-grey-300", "#d1d5db");
      document.documentElement.style.setProperty("--color-grey-400", "#9ca3af");
      document.documentElement.style.setProperty("--color-grey-500", "#6b7280");
      document.documentElement.style.setProperty("--color-grey-600", "#4b5563");
      document.documentElement.style.setProperty("--color-grey-700", "#374151");
      document.documentElement.style.setProperty("--color-grey-800", "#1f2937");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
