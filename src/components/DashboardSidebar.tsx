import { useState } from "react";
import { 
  BarChart3, 
  ShoppingCart, 
  Package,
  MessageCircle,
  Settings,
  Globe,
  CreditCard,
  Home,
  Users,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "overview", title: "Overview", icon: Home },
  { id: "orders", title: "Orders", icon: ShoppingCart },
  { id: "products", title: "Products", icon: Package },
  { id: "analytics", title: "Analytics", icon: BarChart3 },
  { id: "chat", title: "Chat Support", icon: MessageCircle },
  { id: "customers", title: "Customers", icon: Users },
  { id: "payments", title: "Payments", icon: CreditCard },
  { id: "language", title: "Languages", icon: Globe },
  { id: "settings", title: "Settings", icon: Settings },
];

export function DashboardSidebar({ activeSection, setActiveSection }: DashboardSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();
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
    <Sidebar className={open ? "w-64" : "w-14"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="flex flex-col">
        <div className="flex-1">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              {open && <span className="text-xl font-bold text-foreground">AfriCommerce</span>}
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>Business Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveSection(item.id)}
                      className={activeSection === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {open && <span>{item.title}</span>}
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
                  {open && (
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium truncate max-w-32">
                        {businessName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-32">
                        {userEmail}
                      </span>
                    </div>
                  )}
                </div>
                {open && (
                  <ChevronUp className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {open && (
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
            )}
          </Collapsible>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}