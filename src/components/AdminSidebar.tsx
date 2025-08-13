import { useState } from "react";
import { 
  Shield, 
  Users, 
  ShoppingCart, 
  Package,
  BarChart3,
  Settings,
  Home,
  Database,
  CreditCard,
  Truck,
  MessageSquare,
  FileText,
  Globe,
  Activity,
  AlertTriangle,
  User,
  LogOut,
  ChevronUp
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
  SidebarHeader,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const adminMenuItems = [
  { id: "overview", title: "Overview", icon: Home, path: "/admin" },
  { id: "users", title: "User Management", icon: Users, path: "/admin/users" },
  { id: "businesses", title: "Businesses", icon: Package, path: "/admin/businesses" },
  { id: "orders", title: "All Orders", icon: ShoppingCart, path: "/admin/orders" },
  { id: "payments", title: "Payments", icon: CreditCard, path: "/admin/payments" },
  { id: "deliveries", title: "Delivery System", icon: Truck, path: "/admin/deliveries" },
  { id: "analytics", title: "System Analytics", icon: BarChart3, path: "/admin/analytics" },
  { id: "content", title: "Content Management", icon: FileText, path: "/admin/content" },
  { id: "support", title: "Support Center", icon: MessageSquare, path: "/admin/support" },
  { id: "security", title: "Security", icon: Shield, path: "/admin/security" },
  { id: "system", title: "System Health", icon: Activity, path: "/admin/system" },
  { id: "database", title: "Database", icon: Database, path: "/admin/database" },
  { id: "api", title: "API Management", icon: Globe, path: "/admin/api" },
  { id: "reports", title: "Reports", icon: AlertTriangle, path: "/admin/reports" },
  { id: "settings", title: "Admin Settings", icon: Settings, path: "/admin/settings" }
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentPath = location.pathname;
  const adminUser = {
    name: "Admin User",
    email: "admin@africommerce.com",
    role: "Super Administrator"
  };

  const handleSignOut = () => {
    // Clear admin session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of the admin panel",
    });
    
    navigate('/');
  };

  return (
    <Sidebar variant="floating" className="border-r border-border/50 bg-card/50 backdrop-blur">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">AfriCommerce Control</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 py-1">
            ADMINISTRATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full ${isActive ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'hover:bg-muted/50'}`}
                    >
                      <button 
                        onClick={() => navigate(item.path)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left"
                      >
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${isActive ? 'font-medium text-primary' : 'text-foreground'}`}>
                          {item.title}
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-3">
        <Collapsible open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-2 h-auto">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {adminUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {adminUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {adminUser.role}
                  </p>
                </div>
              </div>
              <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-1">
              <div className="px-3 py-2 text-xs text-muted-foreground">
                <p className="font-medium">Administrator Access</p>
                <p>{adminUser.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}