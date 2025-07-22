import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle, TrendingUp, Users, Search, Phone, Mail } from "lucide-react";

const deliveryStats = [
  { label: "Pending", value: "5", change: "+2", icon: AlertCircle, trend: "up" },
  { label: "Active Deliveries", value: "12", change: "+3", icon: Truck, trend: "up" },
  { label: "Completed Today", value: "28", change: "+6", icon: CheckCircle, trend: "up" },
  { label: "Total Deliveries", value: "96", change: "+8", icon: Package, trend: "up" }
];

const activeDeliveries = [
  { 
    id: "DEL-001", 
    customer: "Kwame Asante", 
    customerPhone: "+233 24 123 4567",
    customerEmail: "kwame.asante@email.com",
    address: "East Legon, Accra", 
    items: "2x Jollof Rice, 1x Fried Chicken", 
    driver: "Samuel Boateng",
    driverPhone: "+233 20 555 0123",
    estimatedTime: "15 mins",
    status: "on-route",
    progress: 75,
    orderValue: "₵85",
    orderTime: "12:30 PM"
  },
  { 
    id: "DEL-002", 
    customer: "Fatima Musa", 
    customerPhone: "+233 20 987 6543",
    customerEmail: "fatima.musa@email.com",
    address: "Tema Community 1", 
    items: "1x Waakye + Fish", 
    driver: "Grace Mensah",
    driverPhone: "+233 26 555 0456",
    estimatedTime: "22 mins",
    status: "pending",
    progress: 25,
    orderValue: "₵45",
    orderTime: "1:15 PM"
  },
  { 
    id: "DEL-003", 
    customer: "Emmanuel Osei", 
    customerPhone: "+233 26 456 7890",
    customerEmail: "emmanuel.osei@email.com",
    address: "Achimota, Accra", 
    items: "3x Banku + Tilapia", 
    driver: "Kofi Danso",
    driverPhone: "+233 24 555 0789",
    estimatedTime: "8 mins",
    status: "delivered",
    progress: 100,
    orderValue: "₵120",
    orderTime: "11:45 AM"
  }
];

const deliveryHistory = [
  { id: "DEL-098", customer: "Akosua Frimpong", time: "2:30 PM", amount: "₵45", status: "delivered" },
  { id: "DEL-097", customer: "John Mensah", time: "1:45 PM", amount: "₵32", status: "delivered" },
  { id: "DEL-096", customer: "Ama Darkoa", time: "12:15 PM", amount: "₵28", status: "delivered" },
  { id: "DEL-095", customer: "Prince Owusu", time: "11:30 AM", amount: "₵55", status: "delivered" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "default";
    case "on-route":
      return "secondary";
    case "pending":
      return "outline";
    default:
      return "outline";
  }
};

export function DeliveryManagement() {
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [historySearchTerm, setHistorySearchTerm] = useState("");
  const [driverSearchTerm, setDriverSearchTerm] = useState("");

  // Filter functions
  const filteredActiveDeliveries = activeDeliveries.filter(delivery =>
    delivery.customer.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
    delivery.id.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
    delivery.address.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
    delivery.driver.toLowerCase().includes(activeSearchTerm.toLowerCase())
  );

  const filteredHistory = deliveryHistory.filter(delivery =>
    delivery.customer.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
    delivery.id.toLowerCase().includes(historySearchTerm.toLowerCase())
  );

  const drivers = [
    { name: "Samuel Boateng", status: "active", deliveries: 8, rating: 4.9 },
    { name: "Grace Mensah", status: "active", deliveries: 5, rating: 4.8 },
    { name: "Kofi Danso", status: "off-duty", deliveries: 12, rating: 4.7 },
    { name: "Ama Serwaa", status: "active", deliveries: 3, rating: 5.0 }
  ];

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(driverSearchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryStats.map((stat, index) => (
          <Card key={index} className="hover-lift border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center text-xs text-success">
                    <span className="bg-success/10 text-success px-2 py-1 rounded-full">{stat.change}</span>
                    <span className="ml-2 text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Management Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card className="shadow-warm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Active Deliveries</CardTitle>
                  <CardDescription>Manage and track all ongoing deliveries</CardDescription>
                </div>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search deliveries by customer, ID, address, or driver..."
                    value={activeSearchTerm}
                    onChange={(e) => setActiveSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActiveDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>
                        <div className="font-medium">{delivery.id}</div>
                        <div className="text-xs text-muted-foreground">{delivery.orderTime}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{delivery.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{delivery.customer}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Phone className="w-3 h-3 mr-1" />
                              {delivery.customerPhone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{delivery.driver}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {delivery.driverPhone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-2 text-muted-foreground" />
                          {delivery.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{delivery.items}</div>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {delivery.orderValue}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Badge variant={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                          <div className="w-16">
                            <Progress value={delivery.progress} className="h-1" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {delivery.estimatedTime}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Truck className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                          {delivery.status === "pending" && (
                            <Button size="sm" variant="outline">
                              Ready
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Delivery History</CardTitle>
              <CardDescription>Past deliveries and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search delivery history by customer or ID..."
                  value={historySearchTerm}
                  onChange={(e) => setHistorySearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-3">
                {filteredHistory.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{delivery.customer}</p>
                        <p className="text-sm text-muted-foreground">{delivery.id} • {delivery.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{delivery.amount}</p>
                      <Badge variant="default" className="text-xs">
                        {delivery.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
              <CardDescription>Manage your delivery team</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers by name..."
                  value={driverSearchTerm}
                  onChange={(e) => setDriverSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDrivers.map((driver) => (
                  <div key={driver.name} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{driver.name}</h3>
                          <Badge variant={driver.status === "active" ? "default" : "secondary"} className="text-xs">
                            {driver.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Today's Deliveries:</span>
                        <span className="font-medium">{driver.deliveries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-medium">{driver.rating} ⭐</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
