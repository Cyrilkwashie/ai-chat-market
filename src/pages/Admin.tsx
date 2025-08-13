import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Shield, 
  Users, 
  ShoppingCart, 
  Package, 
  Truck,
  CreditCard,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Menu,
  Bell,
  UserPlus,
  PackagePlus,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  Activity,
  Globe
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Sample data
const adminStats = [
  { label: "Total Revenue", value: "₵45,280", change: "+23.5%", icon: DollarSign, trend: "up" },
  { label: "Total Users", value: "2,847", change: "+12%", icon: Users, trend: "up" },
  { label: "Active Orders", value: "143", change: "+8%", icon: ShoppingCart, trend: "up" },
  { label: "Products", value: "287", change: "+5", icon: Package, trend: "up" }
];

const recentActivities = [
  { id: 1, type: "order", description: "New order #1234 from Kwame Asante", time: "2 mins ago", status: "success" },
  { id: 2, type: "user", description: "New user registration: Fatima Musa", time: "15 mins ago", status: "info" },
  { id: 3, type: "payment", description: "Payment failed for order #1231", time: "1 hour ago", status: "error" },
  { id: 4, type: "product", description: "Product 'Waakye' updated by admin", time: "2 hours ago", status: "success" },
  { id: 5, type: "delivery", description: "Delivery completed for order #1225", time: "3 hours ago", status: "success" }
];

const users = [
  { id: 1, name: "Kwame Asante", email: "kwame@gmail.com", role: "Customer", status: "Active", orders: 23, joined: "2024-01-15" },
  { id: 2, name: "Fatima Musa", email: "fatima@yahoo.com", role: "Customer", status: "Active", orders: 12, joined: "2024-02-20" },
  { id: 3, name: "Emmanuel Osei", email: "emmanuel@outlook.com", role: "Driver", status: "Active", orders: 89, joined: "2024-01-05" },
  { id: 4, name: "Akosua Darko", email: "akosua@gmail.com", role: "Admin", status: "Active", orders: 0, joined: "2023-12-01" }
];

const products = [
  { id: 1, name: "Jollof Rice", category: "Food", price: "₵15", stock: 45, sales: 234, status: "Active" },
  { id: 2, name: "Kente Cloth", category: "Fashion", price: "₵120", stock: 12, sales: 89, status: "Active" },
  { id: 3, name: "Waakye", category: "Food", price: "₵12", stock: 0, sales: 156, status: "Out of Stock" },
  { id: 4, name: "Banku + Tilapia", category: "Food", price: "₵18", stock: 23, sales: 98, status: "Active" }
];

const orders = [
  { id: 1, orderNumber: "#1234", customer: "Kwame Asante", total: "₵45", status: "Delivered", date: "2024-01-20", items: 3 },
  { id: 2, orderNumber: "#1235", customer: "Fatima Musa", total: "₵32", status: "Processing", date: "2024-01-20", items: 2 },
  { id: 3, orderNumber: "#1236", customer: "Emmanuel Osei", total: "₵67", status: "Shipped", date: "2024-01-19", items: 4 },
  { id: 4, orderNumber: "#1237", customer: "Akosua Darko", total: "₵23", status: "Pending", date: "2024-01-19", items: 1 }
];

const chartData = [
  { month: "Jan", revenue: 8500, orders: 145, users: 89 },
  { month: "Feb", revenue: 9200, orders: 156, users: 95 },
  { month: "Mar", revenue: 10100, orders: 172, users: 103 },
  { month: "Apr", revenue: 11300, orders: 189, users: 112 },
  { month: "May", revenue: 12700, orders: 198, users: 125 },
  { month: "Jun", revenue: 11800, orders: 183, users: 118 }
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  orders: { label: "Orders", color: "hsl(var(--secondary))" },
  users: { label: "Users", color: "hsl(var(--accent))" }
};

// Admin Content Component
const AdminContent = () => {
  const { toggleSidebar } = useSidebar();
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "delivered":
      case "success":
        return <Badge variant="default" className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "pending":
      case "processing":
        return <Badge variant="secondary">Pending</Badge>;
      case "shipped":
        return <Badge variant="outline" className="border-blue-200 text-blue-600">Shipped</Badge>;
      case "out of stock":
      case "error":
        return <Badge variant="destructive">Issue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Complete system management and control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="outline" size="sm" className="px-2 md:px-3">
                <Bell className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">5</span>
              </Button>
              <Button size="sm" className="px-2 md:px-3">
                <Download className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Export</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">System Administrator 🛡️</h2>
                  <p className="text-white/80 text-sm md:text-base">Full control over your AfriCommerce platform</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {adminStats.map((stat, index) => (
                <Card key={index} className="hover-lift border-l-4 border-l-primary">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                        <div className="flex items-center text-xs text-success">
                          <span className="bg-success/10 text-success px-2 py-1 rounded-full">{stat.change}</span>
                          <span className="ml-2 text-muted-foreground hidden sm:inline">this month</span>
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

            {/* Admin Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>Latest system activities and events</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-success' :
                            activity.status === 'error' ? 'bg-destructive' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-16 flex-col">
                            <UserPlus className="w-6 h-6 mb-2" />
                            Add User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>Create a new user account</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="username">Username</Label>
                              <Input id="username" placeholder="Enter username" />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" placeholder="Enter email" />
                            </div>
                            <div>
                              <Label htmlFor="role">Role</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="customer">Customer</SelectItem>
                                  <SelectItem value="driver">Driver</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button className="w-full">Create User</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-16 flex-col">
                            <PackagePlus className="w-6 h-6 mb-2" />
                            Add Product
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>Create a new product listing</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="productName">Product Name</Label>
                              <Input id="productName" placeholder="Enter product name" />
                            </div>
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <Input id="price" placeholder="₵0.00" />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="food">Food</SelectItem>
                                  <SelectItem value="fashion">Fashion</SelectItem>
                                  <SelectItem value="electronics">Electronics</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button className="w-full">Create Product</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="h-16 flex-col">
                        <FileText className="w-6 h-6 mb-2" />
                        Reports
                      </Button>

                      <Button variant="outline" className="h-16 flex-col">
                        <Settings className="w-6 h-6 mb-2" />
                        Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Chart */}
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Performance Overview
                    </CardTitle>
                    <CardDescription>Revenue, orders, and user growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                          <Line dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
                          <Line dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card className="shadow-warm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>Manage all platform users</CardDescription>
                      </div>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input placeholder="Search users..." className="max-w-sm" />
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Orders</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>{getStatusBadge(user.status)}</TableCell>
                              <TableCell>{user.orders}</TableCell>
                              <TableCell>{user.joined}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <Card className="shadow-warm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Product Management</CardTitle>
                        <CardDescription>Manage all products and inventory</CardDescription>
                      </div>
                      <Button>
                        <PackagePlus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input placeholder="Search products..." className="max-w-sm" />
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Sales</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>{product.sales}</TableCell>
                              <TableCell>{getStatusBadge(product.status)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card className="shadow-warm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Order Management</CardTitle>
                        <CardDescription>View and manage all customer orders</CardDescription>
                      </div>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Orders
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input placeholder="Search orders..." className="max-w-sm" />
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.orderNumber}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.total}</TableCell>
                              <TableCell>{order.items}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle>Revenue Analytics</CardTitle>
                      <CardDescription>Monthly revenue breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>New user registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line dataKey="users" stroke="var(--color-users)" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                      <CardDescription>Configure system preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="maintenance">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                        </div>
                        <Switch id="maintenance" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send email notifications</p>
                        </div>
                        <Switch id="notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="analytics">Analytics Tracking</Label>
                          <p className="text-sm text-muted-foreground">Enable user analytics</p>
                        </div>
                        <Switch id="analytics" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage security configurations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        View Security Logs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Admin Users
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        API Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Domain Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main Admin Component with SidebarProvider
const Admin = () => {
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
      <AdminContent />
    </SidebarProvider>
  );
};

export default Admin;