import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, MessageCircle, Truck, ShoppingBag, Clock, CheckCircle, DollarSign } from "lucide-react";

const mockOrders = [
  {
    id: "#ORD-001",
    customer: "Kwame Asante",
    phone: "+233 20 123 4567",
    items: "2x Jollof Rice, 1x Grilled Chicken",
    total: "₵35.00",
    status: "confirmed",
    paymentMethod: "MTN MoMo",
    orderTime: "2 mins ago"
  },
  {
    id: "#ORD-002", 
    customer: "Fatima Musa",
    phone: "+233 24 987 6543",
    items: "1x Waakye + Fish, 1x Kelewele",
    total: "₵18.50",
    status: "delivered",
    paymentMethod: "Vodafone Cash",
    orderTime: "15 mins ago"
  },
  {
    id: "#ORD-003",
    customer: "Emmanuel Osei", 
    phone: "+233 50 555 7777",
    items: "3x Banku + Tilapia, 2x Sobolo",
    total: "₵52.00",
    status: "pending",
    paymentMethod: "Cash on Delivery",
    orderTime: "32 mins ago"
  },
  {
    id: "#ORD-004",
    customer: "Adunni Lagos",
    phone: "+233 27 444 8888", 
    items: "1x Fried Rice + Chicken, 1x Chapman",
    total: "₵28.00",
    status: "cancelled",
    paymentMethod: "Paystack",
    orderTime: "1 hour ago"
  }
];

const statusColors = {
  pending: "outline",
  confirmed: "secondary", 
  delivered: "default",
  cancelled: "destructive"
} as const;

export function OrdersOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+12%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-3xl font-bold text-foreground">8</p>
                <div className="flex items-center text-xs">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">+3</span>
                  <span className="ml-2 text-muted-foreground">new today</span>
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
                <p className="text-sm font-medium text-muted-foreground">Confirmed Orders</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+8%</span>
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
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <p className="text-3xl font-bold text-foreground">₵1,235</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+15%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters Card */}
      <Card className="shadow-warm">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Order Management</CardTitle>
              <CardDescription className="text-base">Track and manage all customer orders efficiently</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-56 h-12 border-2 focus:border-primary">
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-3 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Orders List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover-lift transition-all duration-300 hover:shadow-warm border-l-4 border-l-transparent hover:border-l-primary">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-primary" />
                          </div>
                          <p className="font-semibold text-lg">{order.id}</p>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {order.orderTime}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-semibold text-base">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <p className="text-sm font-medium">{order.items}</p>
                        <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md inline-block">
                          {order.paymentMethod}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between lg:justify-end gap-4">
                        <div className="text-right space-y-2">
                          <p className="font-bold text-xl text-primary">{order.total}</p>
                          <Badge 
                            variant={statusColors[order.status as keyof typeof statusColors]}
                            className="text-xs font-medium px-3 py-1"
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 hover:bg-primary/10 hover:text-primary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 hover:bg-accent/10 hover:text-accent">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="w-9 h-9 p-0 hover:bg-success/10 hover:text-success">
                            <Truck className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground mb-2">No orders found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
