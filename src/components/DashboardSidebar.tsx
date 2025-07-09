
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  MessageCircle, 
  Settings, 
  CreditCard, 
  Globe,
  Home
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
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "chat", label: "Chat Support", icon: MessageCircle },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ activeSection, setActiveSection }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={cn("border-r", isCollapsed ? "w-14" : "w-64")} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className={cn(
                      "w-full justify-start transition-colors",
                      activeSection === item.id && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => setActiveSection(item.id)}
                      className="w-full justify-start"
                    >
                      <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
