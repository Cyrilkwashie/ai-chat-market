import { useState } from "react";
import { Bell, Search, Menu, Plus, Calendar, Star, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";

const servicesData = [
  {
    id: "SV-001",
    name: "Hair Braiding Session",
    description: "Professional hair braiding with traditional patterns",
    category: "Beauty",
    price: 80,
    duration: 120,
    type: "In-person",
    bookings: 25,
    revenue: 2000,
    rating: 4.8,
  },
  {
    id: "SV-002", 
    name: "Business Consultation",
    description: "One-on-one business strategy consultation",
    category: "Consulting",
    price: 150,
    duration: 60,
    type: "Online",
    bookings: 18,
    revenue: 2700,
    rating: 4.9,
  },
  {
    id: "SV-003",
    name: "Kente Weaving Workshop",
    description: "Learn traditional kente weaving techniques",
    category: "Education",
    price: 200,
    duration: 180,
    type: "In-person",
    bookings: 12,
    revenue: 2400,
    rating: 4.7,
  },
];

const ServicesContent = () => {
  const { toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const { toast } = useToast();

  const filteredServices = servicesData.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    setIsAddServiceOpen(false);
    toast({
      title: "Service Added",
      description: "New service has been successfully created.",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Mobile Optimized */}
        <header className="border-b border-border p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <SidebarTrigger className="md:hidden p-2">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                  Services Management
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="w-full md:w-[200px] lg:w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="px-2 md:px-3">
                <Bell className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">3</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Manage Your Services 🛠️</h2>
                <p className="text-white/80 text-sm md:text-base">Create and manage service offerings for your customers</p>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover-lift border-l-4 border-l-primary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Services</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">4</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+1 new</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-accent">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">63</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+12%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-success">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Service Revenue</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">₵11,100</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+18%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-secondary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Rating</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-1">
                      4.8 <Star className="h-4 w-4 fill-current text-accent" />
                    </p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">Excellent</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card className="shadow-warm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle className="text-base sm:text-lg">Your Services</CardTitle>
                <CardDescription className="text-sm">Manage your service offerings and track bookings</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Set Availability</span>
                      <span className="sm:hidden">Availability</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Service Availability</DialogTitle>
                      <DialogDescription>Configure your weekly availability for service bookings.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id={day} defaultChecked={day !== "Saturday" && day !== "Sunday"} />
                            <Label htmlFor={day}>{day}</Label>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>09:00 AM</span>
                            <span>-</span>
                            <span>05:00 PM</span>
                            <span className="text-muted-foreground">Break: 12-13</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button onClick={() => setIsAvailabilityOpen(false)} className="w-full">
                      Save Availability
                    </Button>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                      <DialogDescription>Create a new service offering for your customers to book.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input id="serviceName" placeholder="e.g., Hair Braiding Session" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Price (₵)</Label>
                        <Input id="price" type="number" placeholder="150.00" />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" placeholder="60" />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your service offering..." />
                      </div>
                      <div>
                        <Label>Service Type</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="online" />
                            <Label htmlFor="online">Online Service (Video call)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="inPerson" defaultChecked />
                            <Label htmlFor="inPerson">In-person Service</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleAddService} className="w-full">
                      Create Service
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile Card View */}
              <div className="block md:hidden space-y-4">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{service.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Set Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                          <Badge variant={service.type === "Online" ? "outline" : "default"} className="text-xs">
                            {service.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{service.rating}</span>
                          <Star className="h-3 w-3 fill-current text-accent" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-primary font-medium">₵{service.price}</div>
                        <div className="text-muted-foreground">{service.duration}m</div>
                        <div className="text-center">
                          <div className="font-medium">{service.bookings}</div>
                          <div className="text-xs text-muted-foreground">bookings</div>
                        </div>
                        <div className="font-medium">₵{service.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.category}</Badge>
                        </TableCell>
                        <TableCell>₵{service.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{service.duration}m</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={service.type === "Online" ? "outline" : "default"}>
                            {service.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">{service.bookings}</div>
                            <div className="text-xs text-muted-foreground">bookings</div>
                          </div>
                        </TableCell>
                        <TableCell>₵{service.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{service.rating}</span>
                            <Star className="h-3 w-3 fill-current text-accent" />
                          </div>
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
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Set Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <SidebarProvider>
      <ServicesContent />
    </SidebarProvider>
  );
};

export default Services;