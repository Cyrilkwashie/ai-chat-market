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
            {/* Welcome Banner */}
            <div className="hero-gradient rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
                  <p className="text-white/80">Here's what's happening with your business today</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">₵2,450</div>
                  <div className="text-white/80 text-sm">Today's Revenue</div>
                </div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          <div className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                            {stat.change}
                          </div>
                          <span className="text-xs text-muted-foreground">vs yesterday</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks to manage your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16 flex-col space-y-2">
                    <Package className="w-5 h-5" />
                    <span>Add Product</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>View Chats</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Orders - Takes 2 columns */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer orders and their status</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { 
                        id: "#1234", 
                        customer: "Kwame Asante", 
                        items: "2x Jollof Rice", 
                        amount: "₵30", 
                        status: "preparing",
                        time: "2 mins ago",
                        phone: "+233 24 123 4567"
                      },
                      { 
                        id: "#1235", 
                        customer: "Fatima Musa", 
                        items: "1x Waakye + Fish", 
                        amount: "₵15", 
                        status: "delivered",
                        time: "15 mins ago",
                        phone: "+233 20 987 6543"
                      },
                      { 
                        id: "#1236", 
                        customer: "Emmanuel Osei", 
                        items: "3x Banku + Tilapia", 
                        amount: "₵45", 
                        status: "pending",
                        time: "1 hour ago",
                        phone: "+233 55 246 8135"
                      },
                      { 
                        id: "#1237", 
                        customer: "Akosua Adjei", 
                        items: "2x Kenkey + Fish", 
                        amount: "₵25", 
                        status: "confirmed",
                        time: "2 hours ago",
                        phone: "+233 26 741 9628"
                      }
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{order.customer}</p>
                              <span className="text-xs text-muted-foreground">({order.id})</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.items}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold text-lg">{order.amount}</p>
                          <Badge 
                            variant={
                              order.status === "delivered" ? "default" : 
                              order.status === "preparing" ? "secondary" : 
                              order.status === "confirmed" ? "outline" : "outline"
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

              {/* Right Column - AI Insights */}
              <div className="space-y-6">
                {/* AI Chat Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                      AI Performance
                    </CardTitle>
                    <CardDescription>Your chatbot's daily stats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">47</div>
                        <div className="text-sm text-muted-foreground">Customers Served</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">2.3s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Satisfaction Rate</span>
                        <span className="text-sm font-medium text-success">97%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Order Conversion</span>
                        <span className="text-sm font-medium text-success">84%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Top Products Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Jollof Rice", orders: 23, revenue: "₵690" },
                      { name: "Waakye", orders: 18, revenue: "₵540" },
                      { name: "Banku + Tilapia", orders: 12, revenue: "₵480" },
                      { name: "Kenkey + Fish", orders: 8, revenue: "₵200" }
                    ].map((product, index) => (
                      <div key={product.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded text-xs flex items-center justify-center font-medium text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm">{product.revenue}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Language Usage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-primary" />
                      Language Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { lang: "English", percentage: 45, color: "bg-primary" },
                      { lang: "Pidgin", percentage: 30, color: "bg-accent" },
                      { lang: "Twi", percentage: 25, color: "bg-secondary" }
                    ].map((item) => (
                      <div key={item.lang} className="space-y-2">
                        <div className="flex justify-between text-sm">
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