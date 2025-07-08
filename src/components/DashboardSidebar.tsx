import { 
  BarChart3, 
  ShoppingCart, 
  Package,
  MessageCircle,
  Settings,
  Globe,
  CreditCard,
  Home,
  Users
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

  return (
    <Sidebar className={open ? "w-64" : "w-14"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  );
}