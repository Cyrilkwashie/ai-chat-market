import { useState } from "react";
import { Search, Crown, Star, Calendar, Phone, Mail, MapPin, MessageCircle, Eye, Users, DollarSign, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const customersData = [
  {
    id: 1,
    name: "Kwame Asante",
    email: "kwame.asante@email.com",
    phone: "+233 24 123 4567",
    location: "Accra, Greater Accra",
    orders: 23,
    totalSpent: 750,
    status: "vip",
    lastOrder: "2 days ago",
    joinDate: "Jan 2023",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Fatima Musa",
    email: "fatima.musa@email.com",
    phone: "+233 20 987 6543",
    location: "Kumasi, Ashanti",
    orders: 18,
    totalSpent: 540,
    status: "vip",
    lastOrder: "1 day ago",
    joinDate: "Mar 2023",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Emmanuel Osei",
    email: "emmanuel.osei@email.com",
    phone: "+233 26 456 7890",
    location: "Tamale, Northern",
    orders: 12,
    totalSpent: 360,
    status: "active",
    lastOrder: "3 days ago",
    joinDate: "Jun 2023",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Akosua Mensah",
    email: "akosua.mensah@email.com",
    phone: "+233 27 234 5678",
    location: "Cape Coast, Central",
    orders: 8,
    totalSpent: 240,
    status: "inactive",
    lastOrder: "2 weeks ago",
    joinDate: "Aug 2023",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Yaw Boateng",
    email: "yaw.boateng@email.com",
    phone: "+233 23 345 6789",
    location: "Sunyani, Bono",
    orders: 19,
    totalSpent: 570,
    status: "vip",
    lastOrder: "1 day ago",
    joinDate: "Feb 2023",
    avatar: "/placeholder.svg"
  }
];

const topCustomers = [
  { name: "Kwame Asante", orders: 23, totalSpent: 750, isVip: true },
  { name: "Yaw Boateng", orders: 19, totalSpent: 570, isVip: true },
  { name: "Fatima Musa", orders: 18, totalSpent: 540, isVip: true },
  { name: "Emmanuel Osei", orders: 12, totalSpent: 360, isVip: false },
  { name: "Akosua Mensah", orders: 8, totalSpent: 240, isVip: false }
];

const popularProducts = [
  { name: "Jollof Rice", customers: 45, orders: 234 },
  { name: "Waakye", customers: 38, orders: 187 },
  { name: "Banku & Tilapia", customers: 32, orders: 156 },
  { name: "Fried Rice", customers: 28, orders: 134 },
  { name: "Kelewele", customers: 25, orders: 98 }
];

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vipSettings, setVipSettings] = useState({
    minAmount: 500,
    minOrders: 15
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: vipSettings
  });

  const handleVipSettingsSubmit = (data: typeof vipSettings) => {
    setVipSettings(data);
    setIsDialogOpen(false);
  };

  // Check if customer meets VIP criteria based on current settings
  const isVipCustomer = (customer: any) => {
    return customer.totalSpent >= vipSettings.minAmount || customer.orders >= vipSettings.minOrders;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return (
          <Badge className="bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 border-purple-500/20">
            <Crown className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        );
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <p className="text-muted-foreground mt-1">Manage your customer relationships and track their journey</p>
      </div>

      {/* VIP Status Explanation Card */}
      <Card className="border-l-4 border-l-purple-500 bg-purple-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-purple-700">
              <Crown className="w-5 h-5 mr-2" />
              VIP Customer Status
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-purple-700 border-purple-300 hover:bg-purple-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>VIP Customer Criteria</DialogTitle>
                  <DialogDescription>
                    Set the minimum requirements for customers to achieve VIP status
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleVipSettingsSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Minimum Total Spending (₵)</Label>
                    <Input
                      id="minAmount"
                      type="number"
                      {...register("minAmount", { valueAsNumber: true })}
                      placeholder="500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minOrders">Minimum Number of Orders</Label>
                    <Input
                      id="minOrders"
                      type="number"
                      {...register("minOrders", { valueAsNumber: true })}
                      placeholder="15"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Customers automatically become VIP when they meet any of these criteria:
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 mr-2 text-purple-600" />
              <span>Total spending exceeds ₵{vipSettings.minAmount}</span>
            </div>
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 mr-2 text-purple-600" />
              <span>More than {vipSettings.minOrders} total orders</span>
            </div>
          </div>
          <p className="text-xs text-purple-600">
            Status updates automatically based on customer activity. Inactive = No orders in last 7 days.
          </p>
        </CardContent>
      </Card>

      {/* Customer Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-3xl font-bold text-foreground">1,248</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+12%</span>
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-3xl font-bold text-foreground">892</p>
                <div className="flex items-center text-xs">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">7 days</span>
                  <span className="ml-2 text-muted-foreground">activity window</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">VIP Customers</p>
                <p className="text-3xl font-bold text-foreground">156</p>
                <div className="flex items-center text-xs">
                  <span className="bg-purple-500/10 text-purple-700 px-2 py-1 rounded-full">₵{vipSettings.minAmount}+</span>
                  <span className="ml-2 text-muted-foreground">or {vipSettings.minOrders}+ orders</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Customer Revenue</p>
                <p className="text-3xl font-bold text-foreground">₵68,400</p>
                <div className="flex items-center text-xs">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">LTV</span>
                  <span className="ml-2 text-muted-foreground">lifetime value</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List Table */}
      <Card className="shadow-warm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Manage and view all your customers</CardDescription>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, phone, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{customer.name}</p>
                          {customer.status === 'vip' && (
                            <Crown className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {customer.joinDate}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-2 text-muted-foreground" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                        {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3 h-3 mr-2 text-muted-foreground" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{customer.orders}</TableCell>
                  <TableCell className="font-medium text-green-600">₵{customer.totalSpent}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{customer.lastOrder}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Insights Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Customers by Spending */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle>Top Customers by Spending</CardTitle>
            <CardDescription>Your highest value customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{customer.name}</p>
                        {customer.isVip && (
                          <Crown className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full">₵{vipSettings.minAmount}+</span>
                    <span className="ml-2 text-muted-foreground">or {vipSettings.minOrders}+ orders</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Products */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Most ordered items by customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm font-medium text-yellow-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.customers} customers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{product.orders}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
