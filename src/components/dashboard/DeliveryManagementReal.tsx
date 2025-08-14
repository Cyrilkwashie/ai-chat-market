import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function DeliveryManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDeliveryOpen, setIsAddDeliveryOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [newDelivery, setNewDelivery] = useState({
    order_id: "",
    customer_id: "",
    delivery_address: "",
    driver_name: "",
    driver_phone: "",
    estimated_delivery: "",
    notes: ""
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch deliveries with related data
      const { data: deliveriesData, error: deliveriesError } = await supabase
        .from('deliveries')
        .select(`
          *,
          orders (order_number, total_amount),
          customers (name, phone)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (deliveriesError) throw deliveriesError;

      // Fetch orders for the add delivery form
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, order_number, customer_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch customers for the add delivery form
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('id, name, location')
        .eq('user_id', user.id)
        .order('name');

      if (customersError) throw customersError;

      setDeliveries(deliveriesData || []);
      setOrders(ordersData || []);
      setCustomers(customersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch delivery data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDelivery = async () => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .insert({
          ...newDelivery,
          user_id: user.id,
          status: 'pending',
          tracking_number: `TRK-${Date.now()}`,
          estimated_delivery: newDelivery.estimated_delivery || null
        });

      if (error) throw error;

      setNewDelivery({
        order_id: "",
        customer_id: "",
        delivery_address: "",
        driver_name: "",
        driver_phone: "",
        estimated_delivery: "",
        notes: ""
      });
      setIsAddDeliveryOpen(false);
      fetchData();

      toast({
        title: "Success",
        description: "Delivery created successfully",
      });
    } catch (error) {
      console.error('Error adding delivery:', error);
      toast({
        title: "Error",
        description: "Failed to create delivery",
        variant: "destructive",
      });
    }
  };

  const handleEditDelivery = async () => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .update({
          delivery_address: editingDelivery.delivery_address,
          driver_name: editingDelivery.driver_name,
          driver_phone: editingDelivery.driver_phone,
          estimated_delivery: editingDelivery.estimated_delivery || null,
          notes: editingDelivery.notes
        })
        .eq('id', editingDelivery.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEditingDelivery(null);
      fetchData();

      toast({
        title: "Success",
        description: "Delivery updated successfully",
      });
    } catch (error) {
      console.error('Error updating delivery:', error);
      toast({
        title: "Error",
        description: "Failed to update delivery",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDelivery = async (deliveryId: string) => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .delete()
        .eq('id', deliveryId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchData();

      toast({
        title: "Success",
        description: "Delivery deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting delivery:', error);
      toast({
        title: "Error",
        description: "Failed to delete delivery",
        variant: "destructive",
      });
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      
      // If marking as delivered, set actual delivery time
      if (newStatus === 'delivered') {
        updateData.actual_delivery = new Date().toISOString();
      }

      const { error } = await supabase
        .from('deliveries')
        .update(updateData)
        .eq('id', deliveryId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchData();

      toast({
        title: "Success",
        description: "Delivery status updated successfully",
      });
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast({
        title: "Error",
        description: "Failed to update delivery status",
        variant: "destructive",
      });
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.tracking_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orders?.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const deliveryStats = {
    total: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    cancelled: deliveries.filter(d => d.status === 'cancelled').length
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
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
            <h2 className="text-xl md:text-2xl font-bold mb-2">Delivery Management 🚚</h2>
            <p className="text-white/80 text-sm md:text-base">Track and manage your delivery operations</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Deliveries</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{deliveryStats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-orange-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{deliveryStats.pending}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-blue-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{deliveryStats.inTransit}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-green-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{deliveryStats.delivered}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-red-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Cancelled</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{deliveryStats.cancelled}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Management */}
      <Card className="shadow-warm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-base sm:text-lg">Delivery Tracking</CardTitle>
            <CardDescription className="text-sm">Manage delivery operations and track shipments</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog open={isAddDeliveryOpen} onOpenChange={setIsAddDeliveryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Delivery
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Delivery</DialogTitle>
                  <DialogDescription>Create a new delivery for an order</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="order">Order</Label>
                    <Select value={newDelivery.order_id} onValueChange={(value) => setNewDelivery({ ...newDelivery, order_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an order" />
                      </SelectTrigger>
                      <SelectContent>
                        {orders.map(order => (
                          <SelectItem key={order.id} value={order.id}>
                            {order.order_number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="customer">Customer</Label>
                    <Select value={newDelivery.customer_id} onValueChange={(value) => setNewDelivery({ ...newDelivery, customer_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={newDelivery.delivery_address}
                      onChange={(e) => setNewDelivery({ ...newDelivery, delivery_address: e.target.value })}
                      placeholder="Enter delivery address..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="driver-name">Driver Name</Label>
                      <Input
                        id="driver-name"
                        value={newDelivery.driver_name}
                        onChange={(e) => setNewDelivery({ ...newDelivery, driver_name: e.target.value })}
                        placeholder="Driver name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="driver-phone">Driver Phone</Label>
                      <Input
                        id="driver-phone"
                        value={newDelivery.driver_phone}
                        onChange={(e) => setNewDelivery({ ...newDelivery, driver_phone: e.target.value })}
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="estimated">Estimated Delivery</Label>
                    <Input
                      id="estimated"
                      type="datetime-local"
                      value={newDelivery.estimated_delivery}
                      onChange={(e) => setNewDelivery({ ...newDelivery, estimated_delivery: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newDelivery.notes}
                      onChange={(e) => setNewDelivery({ ...newDelivery, notes: e.target.value })}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
                <Button onClick={handleAddDelivery} className="w-full">
                  Create Delivery
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
                placeholder="Search deliveries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredDeliveries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No deliveries found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Estimated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{delivery.tracking_number}</p>
                        <p className="text-xs text-muted-foreground">{getTimeAgo(delivery.created_at)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{delivery.orders?.order_number || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">₵{delivery.orders?.total_amount || "0"}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{delivery.customers?.name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{delivery.customers?.phone || "N/A"}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{delivery.driver_name || "Not assigned"}</p>
                        <p className="text-xs text-muted-foreground">{delivery.driver_phone || "N/A"}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          delivery.status === "delivered" ? "default" : 
                          delivery.status === "in_transit" ? "secondary" : 
                          delivery.status === "cancelled" ? "destructive" : "outline"
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{formatDateTime(delivery.estimated_delivery)}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedDelivery(delivery)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delivery Details</DialogTitle>
                              <DialogDescription>
                                Tracking: {selectedDelivery?.tracking_number}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedDelivery && (
                              <div className="space-y-4">
                                <div>
                                  <Label>Delivery Address</Label>
                                  <p className="text-sm">{selectedDelivery.delivery_address}</p>
                                </div>
                                <div>
                                  <Label>Notes</Label>
                                  <p className="text-sm">{selectedDelivery.notes || "No notes"}</p>
                                </div>
                                <div>
                                  <Label>Update Status</Label>
                                  <Select 
                                    value={selectedDelivery.status} 
                                    onValueChange={(value) => updateDeliveryStatus(selectedDelivery.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="in_transit">In Transit</SelectItem>
                                      <SelectItem value="delivered">Delivered</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingDelivery(delivery)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Delivery</DialogTitle>
                              <DialogDescription>Update delivery information</DialogDescription>
                            </DialogHeader>
                            {editingDelivery && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-address">Delivery Address</Label>
                                  <Textarea
                                    id="edit-address"
                                    value={editingDelivery.delivery_address || ""}
                                    onChange={(e) => setEditingDelivery({ ...editingDelivery, delivery_address: e.target.value })}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-driver-name">Driver Name</Label>
                                    <Input
                                      id="edit-driver-name"
                                      value={editingDelivery.driver_name || ""}
                                      onChange={(e) => setEditingDelivery({ ...editingDelivery, driver_name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-driver-phone">Driver Phone</Label>
                                    <Input
                                      id="edit-driver-phone"
                                      value={editingDelivery.driver_phone || ""}
                                      onChange={(e) => setEditingDelivery({ ...editingDelivery, driver_phone: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-estimated">Estimated Delivery</Label>
                                  <Input
                                    id="edit-estimated"
                                    type="datetime-local"
                                    value={editingDelivery.estimated_delivery ? new Date(editingDelivery.estimated_delivery).toISOString().slice(0, 16) : ""}
                                    onChange={(e) => setEditingDelivery({ ...editingDelivery, estimated_delivery: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-notes">Notes</Label>
                                  <Textarea
                                    id="edit-notes"
                                    value={editingDelivery.notes || ""}
                                    onChange={(e) => setEditingDelivery({ ...editingDelivery, notes: e.target.value })}
                                  />
                                </div>
                                <Button onClick={handleEditDelivery} className="w-full">
                                  Update Delivery
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteDelivery(delivery.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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