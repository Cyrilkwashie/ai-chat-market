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
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Services Management</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
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
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">4</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">63</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">₵11,100</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary flex items-center gap-1">
                  4.8 <Star className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Services</CardTitle>
                <CardDescription>Manage your service offerings and track bookings</CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Availability
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
                          <Star className="h-3 w-3 fill-current text-secondary" />
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