import { useState } from "react";
import { Bell, Search, Menu, Filter, Calendar, MoreHorizontal, Eye, MessageCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";

const bookingsData = [
  {
    id: "BK-001",
    customer: {
      name: "Akosua Mensah",
      phone: "+233 20 123 5678",
      email: "akosua@email.com",
    },
    service: "Hair Braiding Session",
    description: "Traditional kente pattern braiding requested",
    date: "20/01/2024",
    time: "14:00",
    duration: "120m",
    type: "In-person",
    price: 80,
    status: "Confirmed",
  },
  {
    id: "BK-002", 
    customer: {
      name: "Kwame Asante",
      phone: "+233 54 345 6789",
      email: "kwame@business.com",
    },
    service: "Business Consultation",
    description: "Needs help with business expansion strategy",
    date: "22/01/2024",
    time: "10:00",
    duration: "60m",
    type: "Online",
    price: 150,
    status: "Pending",
  },
  {
    id: "BK-003",
    customer: {
      name: "Ama Serwaa",
      phone: "+233 24 987 6543",
      email: "ama@creative.com",
    },
    service: "Kente Weaving Workshop",
    description: "Beginner level traditional weaving",
    date: "25/01/2024",
    time: "09:00",
    duration: "180m",
    type: "In-person",
    price: 200,
    status: "Confirmed",
  },
];

const BookingsContent = () => {
  const { toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const { toast } = useToast();

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = 
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    toast({
      title: "Booking Updated",
      description: `Booking ${bookingId} status changed to ${newStatus}.`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Service Bookings</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking ID, customer, or service..."
                className="w-[200px] lg:w-[300px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Service Bookings 📅</h2>
                <p className="text-white/80 text-sm md:text-base">Manage all your customer service appointments</p>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover-lift border-l-4 border-l-primary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">4</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-secondary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">1</p>
                    <div className="flex items-center text-xs text-secondary">
                      <span className="bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">Review</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-accent">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Confirmed</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">2</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">Ready</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-success">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Revenue</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">₵430</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+24%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage customer service bookings</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customer.name}</div>
                          <div className="text-sm text-muted-foreground">{booking.customer.phone}</div>
                          <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.service}</div>
                          <div className="text-sm text-muted-foreground">{booking.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <div>
                            <div>{booking.date}</div>
                            <div className="text-sm text-muted-foreground">{booking.time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{booking.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={booking.type === "Online" ? "outline" : "secondary"}>
                          {booking.type}
                        </Badge>
                      </TableCell>
                      <TableCell>₵{booking.price}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Contact Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "Confirmed")}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Confirm Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(booking.id, "Cancelled")}
                              className="text-destructive"
                            >
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

const Bookings = () => {
  return (
    <SidebarProvider>
      <BookingsContent />
    </SidebarProvider>
  );
};

export default Bookings;