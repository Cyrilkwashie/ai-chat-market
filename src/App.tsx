import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import DashboardHome from "./pages/DashboardHome";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import ChatDashboard from "./pages/ChatDashboard";
import Payments from "./pages/Payments";
import Deliveries from "./pages/Deliveries";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";

import ChatbotPage from "./pages/ChatbotPage";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import DigitalProducts from "./pages/DigitalProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
            <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/dashboard/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/dashboard/chat" element={<ProtectedRoute><ChatDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/dashboard/deliveries" element={<ProtectedRoute><Deliveries /></ProtectedRoute>} />
            <Route path="/dashboard/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/dashboard/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/dashboard/digital-products" element={<ProtectedRoute><DigitalProducts /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/chat" element={<ChatbotPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
