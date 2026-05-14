// Libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { DarkModeProvider } from "./context/DarkModeContext";

// Layout
import AppLayout from "./ui/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Tours from "./pages/Tours";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Accounts from "./pages/Accounts";

// Features
import ProtectedRoutes from "./features/authentication/ProtectedRoutes";
import BookingDetails from "./features/bookings/BookingDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/bookingDetails/:id"
                  element={<BookingDetails />}
                />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
