import { useState } from "react";
import { 
  BarChart3, 
  ShoppingCart, 
  Package,
  MessageCircle,
  Truck,
  CreditCard,
  Home,
  Users,
  User,
  LogOut,
  ChevronUp,
  Settings as SettingsIcon,
  Wrench,
  Calendar,
  Download
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { id: "overview", title: "Overview", icon: Home, path: "/dashboard" },
  { id: "orders", title: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
  { id: "products", title: "Products", icon: Package, path: "/dashboard/products" },
  { id: "services", title: "Services", icon: Wrench, path: "/dashboard/services" },
  { id: "bookings", title: "Bookings", icon: Calendar, path: "/dashboard/bookings" },
  { id: "digital-products", title: "Digital Products", icon: Download, path: "/dashboard/digital-products" },
  { id: "analytics", title: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { id: "chat", title: "Chat Support", icon: MessageCircle, path: "/dashboard/chat" },
  { id: "customers", title: "Customers", icon: Users, path: "/dashboard/customers" },
  { id: "payments", title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
  { id: "deliveries", title: "Deliveries", icon: Truck, path: "/dashboard/deliveries" },
  { id: "settings", title: "Settings", icon: SettingsIcon, path: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [profileOpen, setProfileOpen] = useState(false);

  // Get user info from localStorage (from onboarding)
  const userEmail = localStorage.getItem("userEmail") || "vendor@example.com";
  const businessProfile = JSON.parse(localStorage.getItem("businessProfile") || "{}");
  const businessName = businessProfile.businessName || "Your Business";

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isOnboarded");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("businessProfile");
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    
    navigate("/");
  };

  return (
    <Sidebar className="w-64">
      <SidebarContent className="flex flex-col">
        <div className="flex-1">
          {/* Header with Logo */}
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">AfriCommerce</span>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>Business Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path}
                        className={location.pathname === item.path ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Profile Section */}
        <div className="mt-auto border-t border-border">
          <Collapsible open={profileOpen} onOpenChange={setProfileOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {businessName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium truncate max-w-32">
                      {businessName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-32">
                      {userEmail}
                    </span>
                  </div>
                </div>
                <ChevronUp className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-2">
                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Business:</span>
                      <span className="font-medium">{businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{businessProfile.businessType || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{businessProfile.location || "Not set"}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}