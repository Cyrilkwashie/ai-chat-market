import { useState, useEffect } from "react";
import { Search, Crown, Star, Calendar, Phone, Mail, MapPin, MessageCircle, Eye, Users, DollarSign, Settings, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function CustomerManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  useEffect(() => {
    if (user) {
      fetchCustomers();
    }
  }, [user]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Fetch customers with their order data
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (customersError) throw customersError;

      // Fetch orders for each customer to calculate stats
      const customersWithStats = await Promise.all(
        (customersData || []).map(async (customer) => {
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount, created_at')
            .eq('customer_id', customer.id)
            .eq('user_id', user.id);

          const totalSpent = orders?.reduce((sum, order) => 
            sum + parseFloat(order.total_amount?.toString() || "0"), 0
          ) || 0;

          const orderCount = orders?.length || 0;
          const lastOrderDate = orders?.[0]?.created_at;

          return {
            ...customer,
            orders: orderCount,
            totalSpent,
            lastOrder: lastOrderDate ? getTimeAgo(lastOrderDate) : "Never",
            isVip: totalSpent >= 500 || orderCount >= 10 // VIP criteria
          };
        })
      );

      setCustomers(customersWithStats);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const { error } = await supabase
        .from('customers')
        .insert({
          ...newCustomer,
          user_id: user.id,
          status: 'active'
        });

      if (error) throw error;

      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        location: ""
      });
      setIsAddCustomerOpen(false);
      fetchCustomers();

      toast({
        title: "Success",
        description: "Customer added successfully",
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "Error",
        description: "Failed to add customer",
        variant: "destructive",
      });
    }
  };

  const handleEditCustomer = async () => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: editingCustomer.name,
          email: editingCustomer.email,
          phone: editingCustomer.phone,
          location: editingCustomer.location
        })
        .eq('id', editingCustomer.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEditingCustomer(null);
      fetchCustomers();

      toast({
        title: "Success",
        description: "Customer updated successfully",
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        title: "Error",
        description: "Failed to update customer",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchCustomers();

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);

    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "vip" && customer.isVip) ||
      (statusFilter === "regular" && !customer.isVip);

    return matchesSearch && matchesStatus;
  });

  const customerStats = {
    total: customers.length,
    vip: customers.filter(c => c.isVip).length,
    active: customers.filter(c => c.status === 'active').length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="hero-gradient rounded-lg md:rounded-xl p-4 md:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Customer Management 👥</h2>
            <p className="text-white/80 text-sm md:text-base">Manage your customer relationships and track their activity</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{customerStats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-yellow-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">VIP Customers</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{customerStats.vip}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-green-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{customerStats.active}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-purple-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">₵{customerStats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management */}
      <Card className="shadow-warm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-base sm:text-lg">Customer Database</CardTitle>
            <CardDescription className="text-sm">Manage customer information and relationships</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Add a new customer to your database</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="e.g., Kwame Asante"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="+233 24 123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newCustomer.location}
                      onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
                      placeholder="Accra, Greater Accra"
                    />
                  </div>
                </div>
                <Button onClick={handleAddCustomer} className="w-full">
                  Add Customer
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "vip" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("vip")}
              >
                VIP
              </Button>
              <Button
                variant={statusFilter === "regular" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("regular")}
              >
                Regular
              </Button>
            </div>
          </div>

          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar_url} />
                          <AvatarFallback>
                            {customer.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'CU'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{customer.name}</p>
                            {customer.isVip && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{customer.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{customer.orders}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      ₵{customer.totalSpent.toFixed(2)}
                    </TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell>
                      <Badge variant={customer.isVip ? "default" : "outline"}>
                        {customer.isVip ? "VIP" : "Regular"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingCustomer(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Customer</DialogTitle>
                              <DialogDescription>Update customer information</DialogDescription>
                            </DialogHeader>
                            {editingCustomer && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-name">Customer Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingCustomer.name}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-email">Email Address</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={editingCustomer.email || ""}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-phone">Phone Number</Label>
                                  <Input
                                    id="edit-phone"
                                    value={editingCustomer.phone || ""}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-location">Location</Label>
                                  <Input
                                    id="edit-location"
                                    value={editingCustomer.location || ""}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer, location: e.target.value })}
                                  />
                                </div>
                                <Button onClick={handleEditCustomer} className="w-full">
                                  Update Customer
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this customer? This action cannot be undone and will permanently remove all customer data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCustomer(customer.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}