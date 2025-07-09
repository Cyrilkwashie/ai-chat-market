
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, ShoppingCart, MessageCircle, Globe, DollarSign, CheckCircle, Clock } from "lucide-react";

const salesData = [
  { period: "Today", revenue: "₵2,450", orders: 24, customers: 18, change: "+12%" },
  { period: "Yesterday", revenue: "₵2,190", orders: 21, customers: 16, change: "+8%" },
  { period: "This Week", revenue: "₵15,680", orders: 143, customers: 89, change: "+18%" },
  { period: "This Month", revenue: "₵68,420", orders: 612, customers: 347, change: "+25%" }
];

const topProducts = [
  { name: "Jollof Rice", orders: 156, revenue: "₵2,340", trend: "up" },
  { name: "Waakye", orders: 134, revenue: "₵1,876", trend: "up" },
  { name: "Banku + Tilapia", orders: 98, revenue: "₵2,156", trend: "down" },
  { name: "Fried Rice", orders: 87, revenue: "₵1,653", trend: "up" },
  { name: "Kelewele", orders: 76, revenue: "₵912", trend: "up" }
];

const languageStats = [
  { language: "English", percentage: 45, orders: 276, color: "bg-blue-500" },
  { language: "Pidgin", percentage: 30, orders: 184, color: "bg-green-500" },
  { language: "Twi", percentage: 15, orders: 92, color: "bg-yellow-500" },
  { language: "Hausa", percentage: 6, orders: 37, color: "bg-purple-500" },
  { language: "Yoruba", percentage: 4, orders: 25, color: "bg-red-500" }
];

const customerInsights = [
  { metric: "New Customers", value: "47", change: "+23%", trend: "up", icon: Users },
  { metric: "Returning Customers", value: "89", change: "+12%", trend: "up", icon: Users },
  { metric: "Customer Satisfaction", value: "97%", change: "+2%", trend: "up", icon: CheckCircle },
  { metric: "Avg Order Value", value: "₵28.50", change: "+5%", trend: "up", icon: DollarSign }
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
          <p className="text-muted-foreground">Track your business performance and insights</p>
        </div>
        <Select defaultValue="week">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sales Overview */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Revenue and order trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesData.map((data, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground">{data.period}</h3>
                <div className="mt-2 space-y-1">
                  <div className="text-2xl font-bold">{data.revenue}</div>
                  <div className="text-sm">{data.orders} orders • {data.customers} customers</div>
                  <div className="flex items-center text-sm text-success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {data.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <div className="flex items-center text-sm">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-success mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language Usage */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle>Language Usage</CardTitle>
            <CardDescription>Customer communication preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageStats.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-sm text-muted-foreground">{lang.orders} orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${lang.color}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{lang.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Customer Insights */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
          <CardDescription>Understanding your customer behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerInsights.map((insight, index) => (
              <Card key={index} className="hover-lift border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{insight.metric}</p>
                      <p className="text-3xl font-bold text-foreground">{insight.value}</p>
                      <div className="flex items-center text-xs text-success">
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full">{insight.change}</span>
                        <span className="ml-2 text-muted-foreground">vs yesterday</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <insight.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>AI Chatbot Performance</CardTitle>
          <CardDescription>How well your AI assistant is performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-lift border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                    <p className="text-3xl font-bold text-foreground">2.3s</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">-0.2s</span>
                      <span className="ml-2 text-muted-foreground">vs yesterday</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                    <p className="text-3xl font-bold text-foreground">94%</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+2%</span>
                      <span className="ml-2 text-muted-foreground">vs yesterday</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Multi-language</p>
                    <p className="text-3xl font-bold text-foreground">6</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+1</span>
                      <span className="ml-2 text-muted-foreground">new language</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
