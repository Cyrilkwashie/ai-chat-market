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
          <div className="space-y-4 md:space-y-6">
            {/* Welcome Banner - Mobile Optimized */}
            <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back! 👋</h2>
                  <p className="text-white/80 text-sm md:text-base">Here's what's happening with your business today</p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-2xl md:text-3xl font-bold">₵2,450</div>
                  <div className="text-white/80 text-sm">Today's Revenue</div>
                </div>
              </div>
            </div>

            {/* Key Stats Grid - Mobile First */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1 md:space-y-2 flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.label}</p>
                        <p className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          <div className="text-xs bg-success/10 text-success px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                            {stat.change}
                          </div>
                          <span className="text-xs text-muted-foreground hidden md:inline">vs yesterday</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-2 md:p-3 rounded-lg md:rounded-xl self-end md:self-auto">
                        <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions - Mobile Optimized */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-sm">Common tasks to manage your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <Button variant="outline" className="h-14 md:h-16 flex-col space-y-1 md:space-y-2 p-2">
                    <Package className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">Add Product</span>
                  </Button>
                  <Button variant="outline" className="h-14 md:h-16 flex-col space-y-1 md:space-y-2 p-2">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">View Chats</span>
                  </Button>
                  <Button variant="outline" className="h-14 md:h-16 flex-col space-y-1 md:space-y-2 p-2">
                    <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Dashboard Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Recent Orders - Mobile First */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Recent Orders</CardTitle>
                        <CardDescription className="text-sm">Latest customer orders and status</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { 
                        id: "#1234", 
                        customer: "Kwame Asante", 
                        items: "2x Jollof Rice", 
                        amount: "₵30", 
                        status: "preparing",
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
                      <div key={order.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-sm md:text-base truncate">{order.customer}</p>
                              <span className="text-xs text-muted-foreground hidden md:inline">({order.id})</span>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">{order.items}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1 flex-shrink-0">
                          <p className="font-semibold text-sm md:text-lg">{order.amount}</p>
                          <Badge 
                            variant={
                              order.status === "delivered" ? "default" : 
                              order.status === "preparing" ? "secondary" : "outline"
                            }
                            className="text-xs"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - AI Insights - Mobile First */}
              <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                {/* AI Chat Performance */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-base md:text-lg">
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                      AI Performance
                    </CardTitle>
                    <CardDescription className="text-sm">Chatbot daily stats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-primary">47</div>
                        <div className="text-xs md:text-sm text-muted-foreground">Customers Served</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm">Response Time</span>
                        <span className="text-xs md:text-sm font-medium">2.3s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm">Satisfaction Rate</span>
                        <span className="text-xs md:text-sm font-medium text-success">97%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm">Order Conversion</span>
                        <span className="text-xs md:text-sm font-medium text-success">84%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Products - Mobile Optimized */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-base md:text-lg">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                      Top Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Jollof Rice", orders: 23, revenue: "₵690" },
                      { name: "Waakye", orders: 18, revenue: "₵540" },
                      { name: "Banku + Tilapia", orders: 12, revenue: "₵480" }
                    ].map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/10 rounded text-xs flex items-center justify-center font-medium text-primary flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs md:text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                          </div>
                        </div>
                        <span className="font-medium text-xs md:text-sm flex-shrink-0">{product.revenue}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Language Usage - Mobile Optimized */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-base md:text-lg">
                      <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { lang: "English", percentage: 45, color: "bg-primary" },
                      { lang: "Pidgin", percentage: 30, color: "bg-accent" },
                      { lang: "Twi", percentage: 25, color: "bg-secondary" }
                    ].map((item) => (
                      <div key={item.lang} className="space-y-2">
                        <div className="flex justify-between text-xs md:text-sm">
                          <span>{item.lang}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Business Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { action: "New order from WhatsApp", time: "2 mins ago", icon: MessageCircle },
                    { action: "Payment received via MTN MoMo", time: "5 mins ago", icon: CreditCard },
                    { action: "Product 'Jollof Rice' updated", time: "1 hour ago", icon: Package },
                    { action: "Customer gave 5-star rating", time: "2 hours ago", icon: Users }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Business Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Completion</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-[95%]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Payment methods configured</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>AI assistant active</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <span>Add more product photos</span>
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
        
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header - Mobile Optimized */}
          <header className="border-b border-border p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                  {activeSection === "overview" ? "Dashboard" : 
                   activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base hidden md:block">
                  {activeSection === "overview" ? "Welcome back! Here's what's happening with your business." :
                   `Manage your ${activeSection} here`}
                </p>
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
                <Button size="sm" className="px-2 md:px-3">
                  <Plus className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Add Product</span>
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
    </SidebarProvider>
  );
};

export default Dashboard;