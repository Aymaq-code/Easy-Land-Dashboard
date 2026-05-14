// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --color-brand-50: #eff6ff;
    --color-brand-100: #dbeafe;
    --color-brand-200: #bfdbfe;
    --color-brand-300: #93c5fd;
    --color-brand-400: #60a5fa;
    --color-brand-500: #3b82f6;
    --color-brand-600: #2563eb;
    --color-brand-700: #1d4ed8;
    --color-brand-800: #1e40af;
    --color-brand-900: #1e3a8a;

    --color-grey-0: #ffffff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    --color-blue-100: #dbeafe;
    --color-blue-700: #1d4ed8;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-indigo-700: #4338ca;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.1);

    /* Border Radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--color-grey-700);
    background-color: var(--color-grey-100);
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-500);
  }
`;

export default GlobalStyles;
