import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  MessageCircle,
  Settings,
  Globe,
  CreditCard,
  Bell,
  Search,
  Plus
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OrdersOverview } from "@/components/dashboard/OrdersOverview";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { ProductManagement } from "@/components/dashboard/ProductManagement";
import { ChatSupport } from "@/components/dashboard/ChatSupport";
import { PaymentSettings } from "@/components/dashboard/PaymentSettings";
import { LanguageSettings } from "@/components/dashboard/LanguageSettings";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const stats = [
    { label: "Today's Sales", value: "₵2,450", change: "+12%", icon: TrendingUp, trend: "up" },
    { label: "Total Orders", value: "143", change: "+8%", icon: ShoppingCart, trend: "up" },
    { label: "Active Products", value: "67", change: "+3", icon: Package, trend: "up" },
    { label: "Customers", value: "1,248", change: "+24", icon: Users, trend: "up" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrdersOverview />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "products":
        return <ProductManagement />;
      case "chat":
        return <ChatSupport />;
      case "payments":
        return <PaymentSettings />;
      case "language":
        return <LanguageSettings />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-success">
                          {stat.change} from yesterday
                        </p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: "#1234", customer: "Kwame Asante", items: "2x Jollof Rice", amount: "₵30", status: "preparing" },
                    { id: "#1235", customer: "Fatima Musa", items: "1x Waakye + Fish", amount: "₵15", status: "delivered" },
                    { id: "#1236", customer: "Emmanuel Osei", items: "3x Banku + Tilapia", amount: "₵45", status: "pending" }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <Badge variant={order.status === "delivered" ? "default" : order.status === "preparing" ? "secondary" : "outline"}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Chat Insights</CardTitle>
                  <CardDescription>Customer interaction summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Today's Highlights</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 47 customers served via WhatsApp</li>
                      <li>• Most requested: Jollof Rice (23 orders)</li>
                      <li>• Average response time: 2.3 seconds</li>
                      <li>• Customer satisfaction: 97%</li>
                    </ul>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Language Usage</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>English</span>
                        <span>45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pidgin</span>
                        <span>30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Twi</span>
                        <span>25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {activeSection === "overview" ? "Dashboard Overview" : 
                   activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                <p className="text-muted-foreground">
                  {activeSection === "overview" ? "Welcome back! Here's what's happening with your business." :
                   `Manage your ${activeSection} here`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  3
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;