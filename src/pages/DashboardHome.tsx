import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHomeContent = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    todaysSales: 0,
    totalOrders: 0,
    activeProducts: 0,
    customers: 0
  });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders for stats and charts
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id);

      // Fetch products for stats
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      // Fetch customers
      const { data: customers } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const todaysOrders = orders?.filter(order => 
        order.created_at.startsWith(today)
      ) || [];
      
      const todaysSales = todaysOrders.reduce((sum, order) => 
        sum + parseFloat(order.total_amount?.toString() || "0"), 0
      );

      setStats({
        todaysSales,
        totalOrders: orders?.length || 0,
        activeProducts: products?.length || 0,
        customers: customers?.length || 0
      });

      // Calculate top products from order items
      const productSales = new Map();
      orders?.forEach(order => {
        order.order_items?.forEach((item: any) => {
          if (item.product_id) {
            const existing = productSales.get(item.product_id) || { 
              quantity: 0, 
              revenue: 0,
              name: `Product ${item.product_id}` 
            };
            existing.quantity += item.quantity;
            existing.revenue += parseFloat(item.total_price?.toString() || "0");
            productSales.set(item.product_id, existing);
          }
        });
      });

      // Get product names
      const productIds = Array.from(productSales.keys());
      if (productIds.length > 0) {
        const { data: productNames } = await supabase
          .from('products')
          .select('id, name')
          .in('id', productIds);
        
        productNames?.forEach(product => {
          if (productSales.has(product.id)) {
            productSales.get(product.id).name = product.name;
          }
        });
      }

      const topProductsArray = Array.from(productSales.entries())
        .map(([id, data]) => ({
          name: data.name,
          orders: data.quantity,
          revenue: `₵${data.revenue.toFixed(2)}`
        }))
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 5);

      setTopProducts(topProductsArray);

      // Recent orders with customer info
      const recentOrdersWithCustomers = await Promise.all(
        (orders?.slice(-3).reverse() || []).map(async (order) => {
          let customerName = 'Unknown Customer';
          if (order.customer_id) {
            const { data: customer } = await supabase
              .from('customers')
              .select('name')
              .eq('id', order.customer_id)
              .single();
            customerName = customer?.name || customerName;
          }

          return {
            id: order.order_number,
            customer: customerName,
            items: `${order.order_items?.length || 0} items`,
            amount: `₵${parseFloat(order.total_amount?.toString() || "0").toFixed(2)}`,
            status: order.status,
            time: getTimeAgo(order.created_at)
          };
        })
      );

      setRecentOrders(recentOrdersWithCustomers);

      // Generate yearly revenue data
      const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(2024, i).toLocaleDateString('en', { month: 'short' });
        const monthOrders = orders?.filter(order => {
          const orderMonth = new Date(order.created_at).getMonth();
          return orderMonth === i;
        }) || [];
        
        const amount = monthOrders.reduce((sum, order) => 
          sum + parseFloat(order.total_amount?.toString() || "0"), 0
        );

        return { month, amount };
      });

      setYearlyData(monthlyRevenue);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const chartConfig = {
    amount: {
      label: "Revenue (₵)",
      color: "hsl(var(--primary))",
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      
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
                  Dashboard
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
              <Card className="hover-lift border-l-4 border-l-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Today's Sales</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">₵{stats.todaysSales.toFixed(2)}</p>
                      <div className="flex items-center text-xs text-success">
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full">Live</span>
                        <span className="ml-2 text-muted-foreground hidden sm:inline">vs yesterday</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-l-4 border-l-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.totalOrders}</p>
                      <div className="flex items-center text-xs text-success">
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full">All time</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-l-4 border-l-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Products</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.activeProducts}</p>
                      <div className="flex items-center text-xs text-success">
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-l-4 border-l-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Customers</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.customers}</p>
                      <div className="flex items-center text-xs text-success">
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full">Total</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  <CardContent className="pr-2 sm:pr-3">
                    <ChartContainer config={chartConfig} className="h-48 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products - Same height as chart */}
              <div>
                <Card className="shadow-warm h-full">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                      Top Products
                    </CardTitle>
                    <CardDescription className="text-sm">Best sellers this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
                    {topProducts.length > 0 ? topProducts.map((product, index) => (
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
                    )) : (
                      <p className="text-sm text-muted-foreground">No sales data yet</p>
                    )}
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
                  {recentOrders.length > 0 ? recentOrders.map((order) => (
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
                  )) : (
                    <p className="text-sm text-muted-foreground col-span-full">No recent orders</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main Dashboard Component with SidebarProvider
const DashboardHome = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <DashboardHomeContent />
    </SidebarProvider>
  );
};

export default DashboardHome;