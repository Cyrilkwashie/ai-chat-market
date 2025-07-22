import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle, TrendingUp, Users, Search } from "lucide-react";

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
    address: "East Legon, Accra", 
    items: "2x Jollof Rice, 1x Fried Chicken", 
    driver: "Samuel Boateng",
    estimatedTime: "15 mins",
    status: "on-route",
    progress: 75
  },
  { 
    id: "DEL-002", 
    customer: "Fatima Musa", 
    address: "Tema Community 1", 
    items: "1x Waakye + Fish", 
    driver: "Grace Mensah",
    estimatedTime: "22 mins",
    status: "pending",
    progress: 25
  },
  { 
    id: "DEL-003", 
    customer: "Emmanuel Osei", 
    address: "Achimota, Accra", 
    items: "3x Banku + Tilapia", 
    driver: "Kofi Danso",
    estimatedTime: "8 mins",
    status: "delivered",
    progress: 100
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
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Real-time tracking of ongoing deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search deliveries by customer, ID, address, or driver..."
                  value={activeSearchTerm}
                  onChange={(e) => setActiveSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-4">
                {filteredActiveDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{delivery.customer}</h3>
                          <Badge variant={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{delivery.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">ETA: {delivery.estimatedTime}</p>
                        <p className="text-xs text-muted-foreground">Driver: {delivery.driver}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.items}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivery Progress</span>
                        <span>{delivery.progress}%</span>
                      </div>
                      <Progress value={delivery.progress} className="h-2" />
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline">Track Order</Button>
                      <Button size="sm" variant="outline">Contact Driver</Button>
                      {delivery.status === "pending" && (
                        <Button size="sm">Mark Ready</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
