import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Truck, MapPin, Package, CheckCircle, AlertCircle, Users, Search, Phone, Clock, TrendingUp } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Delivery Management 🚚</h2>
            <p className="text-white/80 text-sm md:text-base">Track active deliveries and view delivery history</p>
          </div>
        </div>
      </div>

      {/* Enhanced Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {deliveryStats.map((stat, index) => (
          <Card key={index} className="hover-lift border-l-4 border-l-primary">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center text-xs text-success">
                    <span className="bg-success/10 text-success px-2 py-1 rounded-full">{stat.change}</span>
                    <span className="ml-2 text-muted-foreground hidden sm:inline">vs yesterday</span>
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

      {/* Simplified Two-Section Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Deliveries Section */}
        <Card className="shadow-warm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Active Deliveries
                </CardTitle>
                <CardDescription className="text-sm">Currently in progress</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search active..."
                  value={activeSearchTerm}
                  onChange={(e) => setActiveSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActiveDeliveries.map((delivery) => (
                <div key={delivery.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{delivery.id}</div>
                        <div className="text-sm text-muted-foreground">{delivery.orderTime}</div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">{delivery.customer}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Driver:</span>
                      <span>{delivery.driver}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">ETA:</span>
                      <span className="font-medium text-accent">{delivery.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-medium text-success">{delivery.orderValue}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{delivery.progress}%</span>
                    </div>
                    <Progress value={delivery.progress} className="h-2" />
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery History Section */}
        <Card className="shadow-warm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Delivery History
                </CardTitle>
                <CardDescription className="text-sm">Recently completed deliveries</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search history..."
                  value={historySearchTerm}
                  onChange={(e) => setHistorySearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredHistory.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{delivery.customer}</p>
                      <p className="text-xs text-muted-foreground">{delivery.id} • {delivery.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{delivery.amount}</p>
                    <Badge variant="default" className="text-xs">
                      {delivery.status}
                    </Badge>
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