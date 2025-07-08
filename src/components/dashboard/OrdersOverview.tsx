import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, MessageCircle, Truck } from "lucide-react";

const mockOrders = [
  {
    id: "#ORD-001",
    customer: "Kwame Asante",
    phone: "+233 20 123 4567",
    items: "2x Jollof Rice, 1x Grilled Chicken",
    total: "₵35.00",
    status: "preparing",
    paymentMethod: "MTN MoMo",
    orderTime: "2 mins ago",
    language: "English"
  },
  {
    id: "#ORD-002", 
    customer: "Fatima Musa",
    phone: "+233 24 987 6543",
    items: "1x Waakye + Fish, 1x Kelewele",
    total: "₵18.50",
    status: "delivered",
    paymentMethod: "Vodafone Cash",
    orderTime: "15 mins ago",
    language: "Hausa"
  },
  {
    id: "#ORD-003",
    customer: "Emmanuel Osei", 
    phone: "+233 50 555 7777",
    items: "3x Banku + Tilapia, 2x Sobolo",
    total: "₵52.00",
    status: "pending",
    paymentMethod: "Cash on Delivery",
    orderTime: "32 mins ago", 
    language: "Twi"
  },
  {
    id: "#ORD-004",
    customer: "Adunni Lagos",
    phone: "+233 27 444 8888", 
    items: "1x Fried Rice + Chicken, 1x Chapman",
    total: "₵28.00",
    status: "cancelled",
    paymentMethod: "Paystack",
    orderTime: "1 hour ago",
    language: "Yoruba"
  }
];

const statusColors = {
  pending: "outline",
  preparing: "secondary", 
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
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Today's Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">₵1,235</div>
            <div className="text-sm text-muted-foreground">Today's Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">18</div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">3.2 min</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Track and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  <div className="space-y-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.orderTime}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                    <Badge variant="outline" className="text-xs">
                      {order.language}
                    </Badge>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-sm">{order.items}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end gap-2">
                    <Badge variant={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Truck className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}