import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Onboarding from "./pages/Onboarding";
import ChatbotPage from "./pages/ChatbotPage";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import DigitalProducts from "./pages/DigitalProducts";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/chat" element={<ChatDashboard />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/deliveries" element={<Deliveries />} />
          <Route path="/dashboard/services" element={<Services />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/digital-products" element={<DigitalProducts />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/chat" element={<ChatbotPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
