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
  Truck,
  CreditCard,
  Bell,
  Search,
  Menu,
  DollarSign
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { OrdersOverview } from "@/components/dashboard/OrdersOverview";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { ProductManagement } from "@/components/dashboard/ProductManagement";
import { ChatSupport } from "@/components/dashboard/ChatSupport";
import { PaymentSettings } from "@/components/dashboard/PaymentSettings";
import { DeliveryManagement } from "@/components/dashboard/DeliveryManagement";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { CustomerManagement } from "@/components/dashboard/CustomerManagement";
import { SettingsManagement } from "@/components/dashboard/SettingsManagement";

// Dashboard Content Component
const DashboardContent = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { toggleSidebar } = useSidebar();

  const stats = [
    { label: "Today's Sales", value: "₵2,450", change: "+12%", icon: TrendingUp, trend: "up" },
    { label: "Total Orders", value: "143", change: "+8%", icon: ShoppingCart, trend: "up" },
    { label: "Active Products", value: "67", change: "+3", icon: Package, trend: "up" },
    { label: "Customers", value: "1,248", change: "+24", icon: Users, trend: "up" }
  ];

  const yearlyData = [
    { month: "Jan", amount: 45200 },
    { month: "Feb", amount: 52800 },
    { month: "Mar", amount: 48900 },
    { month: "Apr", amount: 61500 },
    { month: "May", amount: 55300 },
    { month: "Jun", amount: 68400 },
    { month: "Jul", amount: 72100 },
    { month: "Aug", amount: 59800 },
    { month: "Sep", amount: 66200 },
    { month: "Oct", amount: 78300 },
    { month: "Nov", amount: 84600 },
    { month: "Dec", amount: 91200 },
  ];

  const chartConfig = {
    amount: {
      label: "Revenue (₵)",
      color: "hsl(var(--primary))",
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrdersOverview />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "products":
        return <ProductManagement />;
      case "customers":
        return <CustomerManagement />;
      case "chat":
        return <ChatSupport />;
      case "payments":
        return <PaymentSettings />;
      case "deliveries":
        return <DeliveryManagement />;
      case "settings":
        return <SettingsManagement />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Banner - Mobile Optimized */}
            <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back! 👋</h2>
                  <p className="text-white/80 text-sm md:text-base">Here's what's happening with your business today</p>
                </div>
              </div>
            </div>

            {/* Enhanced Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-lift border-l-4 border-l-primary">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                        <div className="flex items-center text-xs text-success">
                          <span className="bg-success/10 text-success px-2 py-1 rounded-full">{stat.change}</span>
                          <span className="ml-2 text-muted-foreground hidden sm:inline">vs yesterday</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Grid - Improved Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Monthly Revenue Chart */}
              <div className="lg:col-span-2">
                <Card className="shadow-warm">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                      Yearly Revenue
                    </CardTitle>
                    <CardDescription className="text-sm">Revenue performance over the last 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-48 sm:h-64">
                      <BarChart data={yearlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products - Compact */}
              <div>
                <Card className="shadow-warm">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                      Top Products
                    </CardTitle>
                    <CardDescription className="text-sm">Best sellers this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3">
                    {[
                      { name: "Jollof Rice", orders: 23, revenue: "₵690" },
                      { name: "Waakye", orders: 18, revenue: "₵540" },
                      { name: "Banku + Tilapia", orders: 12, revenue: "₵480" },
                      { name: "Fried Rice", orders: 8, revenue: "₵320" }
                    ].map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded text-xs flex items-center justify-center font-medium text-primary flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs sm:text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                          </div>
                        </div>
                        <span className="font-medium text-xs sm:text-sm flex-shrink-0">{product.revenue}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Orders - Full Width */}
            <Card className="shadow-warm">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
                    <CardDescription className="text-sm">Latest customer orders and status</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs px-2 sm:px-3">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { 
                      id: "#1234", 
                      customer: "Kwame Asante", 
                      items: "2x Jollof Rice", 
                      amount: "₵30", 
                      status: "confirmed",
                      time: "2 mins ago"
                    },
                    { 
                      id: "#1235", 
                      customer: "Fatima Musa", 
                      items: "1x Waakye + Fish", 
                      amount: "₵15", 
                      status: "delivered",
                      time: "15 mins ago"
                    },
                    { 
                      id: "#1236", 
                      customer: "Emmanuel Osei", 
                      items: "3x Banku + Tilapia", 
                      amount: "₵45", 
                      status: "pending",
                      time: "1 hour ago"
                    }
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <p className="font-medium text-xs sm:text-sm truncate">{order.customer}</p>
                            <span className="text-xs text-muted-foreground">({order.id})</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{order.items}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1 flex-shrink-0">
                        <p className="font-semibold text-base sm:text-lg">{order.amount}</p>
                        <Badge 
                          variant={
                            order.status === "delivered" ? "default" : 
                            order.status === "confirmed" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header - Mobile Optimized */}
        <header className="border-b border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                  {activeSection === "overview" ? "Dashboard" : 
                   activeSection === "customers" ? "Customer Management" :
                   activeSection === "analytics" ? "Analytics" :
                   activeSection === "deliveries" ? "Delivery Management" :
                   activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-40 lg:w-64" />
              </div>
              <Button variant="outline" size="sm" className="px-2 md:px-3">
                <Bell className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">3</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content - Mobile Optimized */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Main Dashboard Component with SidebarProvider
const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default Dashboard;
