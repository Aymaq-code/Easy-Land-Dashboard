import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./features/authentication/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AppLayout from "./ui/AppLayout";
import Account from "./pages/Account";
import Tours from "./pages/Tours";
import BookingDetails from "./features/bookings/BookingDetails";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

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
                <Route path="/account" element={<Account />} />
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
