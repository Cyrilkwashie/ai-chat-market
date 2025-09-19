import { useState, useEffect } from "react";
import { Bell, Search, Menu, Plus, Calendar, Star, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration_minutes: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ServiceForm {
  name: string;
  description: string;
  category: string;
  price: string;
  duration_minutes: string;
  status: string;
}

export const ServiceManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceForm>({
    name: '',
    description: '',
    category: '',
    price: '',
    duration_minutes: '',
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([
          {
            user_id: user?.id,
            name: serviceForm.name,
            description: serviceForm.description,
            category: serviceForm.category,
            price: parseFloat(serviceForm.price),
            duration_minutes: parseInt(serviceForm.duration_minutes),
            status: serviceForm.status
          }
        ])
        .select();

      if (error) throw error;

      setServices(prev => [data[0], ...prev]);
      setServiceForm({
        name: '',
        description: '',
        category: '',
        price: '',
        duration_minutes: '',
        status: 'active'
      });
      setIsAddServiceOpen(false);
      
      toast({
        title: "Success",
        description: "Service added successfully",
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const handleEditService = async () => {
    if (!editingService) return;

    try {
      const { data, error } = await supabase
        .from('services')
        .update({
          name: serviceForm.name,
          description: serviceForm.description,
          category: serviceForm.category,
          price: parseFloat(serviceForm.price),
          duration_minutes: parseInt(serviceForm.duration_minutes),
          status: serviceForm.status
        })
        .eq('id', editingService.id)
        .select();

      if (error) throw error;

      setServices(prev => prev.map(service => 
        service.id === editingService.id ? data[0] : service
      ));
      setEditingService(null);
      setServiceForm({
        name: '',
        description: '',
        category: '',
        price: '',
        duration_minutes: '',
        status: 'active'
      });
      setIsEditServiceOpen(false);
      
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== serviceId));
      
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description || '',
      category: service.category,
      price: service.price.toString(),
      duration_minutes: service.duration_minutes?.toString() || '',
      status: service.status
    });
    setIsEditServiceOpen(true);
  };

  const filteredServices = services.filter(service =>
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
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
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{services.length}</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">Active</span>
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
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Duration</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / services.length) : 0}m
                </p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">Average</span>
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
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Price</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  ₵{services.length > 0 ? (services.reduce((sum, s) => sum + s.price, 0) / services.length).toFixed(0) : 0}
                </p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">Average</span>
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
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {new Set(services.map(s => s.category).filter(Boolean)).size}
                </p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">Unique</span>
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
                    <Input 
                      id="serviceName" 
                      placeholder="e.g., Hair Braiding Session"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      placeholder="e.g., Beauty"
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₵)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="150.00"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="60"
                      value={serviceForm.duration_minutes}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, duration_minutes: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your service offering..."
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={serviceForm.status} 
                      onValueChange={(value) => setServiceForm(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
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
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No services found</p>
            </div>
          ) : (
            <>
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
                            <DropdownMenuItem onClick={() => openEditDialog(service)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{service.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                          <Badge variant={service.status === 'active' ? 'default' : 'outline'} className="text-xs">
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-primary font-medium">₵{service.price.toFixed(2)}</div>
                        <div className="text-muted-foreground">{service.duration_minutes || 0}m</div>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">₵{service.price.toFixed(2)}</TableCell>
                        <TableCell>{service.duration_minutes || 0}m</TableCell>
                        <TableCell>
                          <Badge variant={service.status === 'active' ? 'default' : 'outline'}>
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(service)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{service.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Service Dialog */}
      <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update your service details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editServiceName">Service Name</Label>
              <Input 
                id="editServiceName" 
                placeholder="e.g., Hair Braiding Session"
                value={serviceForm.name}
                onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="editCategory">Category</Label>
              <Input 
                id="editCategory" 
                placeholder="e.g., Beauty"
                value={serviceForm.category}
                onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="editPrice">Price (₵)</Label>
              <Input 
                id="editPrice" 
                type="number" 
                placeholder="150.00"
                value={serviceForm.price}
                onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="editDuration">Duration (minutes)</Label>
              <Input 
                id="editDuration" 
                type="number" 
                placeholder="60"
                value={serviceForm.duration_minutes}
                onChange={(e) => setServiceForm(prev => ({ ...prev, duration_minutes: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea 
                id="editDescription" 
                placeholder="Describe your service offering..."
                value={serviceForm.description}
                onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="editStatus">Status</Label>
              <Select 
                value={serviceForm.status} 
                onValueChange={(value) => setServiceForm(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleEditService} className="w-full">
            Update Service
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};