import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Package, TrendingUp, TrendingDown } from "lucide-react";

const mockProducts = [
  {
    id: "PROD-001",
    name: "Jollof Rice with Chicken",
    description: "Perfectly seasoned jollof rice served with grilled chicken",
    price: "₵15.00",
    category: "Main Course",
    stock: 45,
    status: "active",
    orders: 156,
    revenue: "₵2,340",
    trend: "up",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-002", 
    name: "Waakye with Fish",
    description: "Traditional waakye with fried fish, gari, and shito",
    price: "₵12.00",
    category: "Main Course",
    stock: 32,
    status: "active",
    orders: 134,
    revenue: "₵1,608",
    trend: "up",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-003",
    name: "Banku with Tilapia",
    description: "Fresh banku served with grilled tilapia and pepper sauce",
    price: "₵18.00",
    category: "Main Course", 
    stock: 18,
    status: "low_stock",
    orders: 98,
    revenue: "₵1,764",
    trend: "down",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-004",
    name: "Kelewele",
    description: "Spicy fried plantain cubes with ginger and pepper",
    price: "₵8.00",
    category: "Snacks",
    stock: 67,
    status: "active",
    orders: 89,
    revenue: "₵712",
    trend: "up",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-005",
    name: "Sobolo",
    description: "Refreshing hibiscus drink with ginger and pineapple",
    price: "₵5.00",
    category: "Beverages",
    stock: 0,
    status: "out_of_stock",
    orders: 67,
    revenue: "₵335",
    trend: "down",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop"
  }
];

const categories = ["All", "Main Course", "Snacks", "Beverages", "Desserts"];

const statusColors = {
  active: "default",
  low_stock: "secondary", 
  out_of_stock: "destructive"
} as const;

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">67</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">54</div>
                <div className="text-sm text-muted-foreground">In Stock</div>
              </div>
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
              <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Manage your menu items and inventory</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new menu item for your catalog</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="e.g., Jollof Rice with Chicken" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₵)</Label>
                    <Input id="price" type="number" placeholder="15.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Course</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="desserts">Desserts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" type="number" placeholder="50" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your product..." />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <Badge variant={statusColors[product.status as keyof typeof statusColors]} className="text-xs">
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">{product.price}</span>
                        <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">{product.orders} orders</span>
                        <div className="flex items-center space-x-1">
                          {product.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 text-success" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-destructive" />
                          )}
                          <span className="font-medium">{product.revenue}</span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}