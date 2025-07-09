
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Package, TrendingUp, TrendingDown, Grid3X3, List } from "lucide-react";

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
  },
  {
    id: "PROD-006",
    name: "Samsung Smart TV 55\"",
    description: "4K Ultra HD Smart TV with streaming capabilities",
    price: "₵2,800.00",
    category: "Electronics",
    stock: 12,
    status: "active",
    orders: 23,
    revenue: "₵64,400",
    trend: "up",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-007",
    name: "LG Refrigerator",
    description: "Double door refrigerator with freezer compartment",
    price: "₵1,850.00",
    category: "Appliances",
    stock: 8,
    status: "low_stock",
    orders: 31,
    revenue: "₵57,350",
    trend: "up",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-008",
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced camera system",
    price: "₵5,200.00",
    category: "Electronics",
    stock: 15,
    status: "active",
    orders: 42,
    revenue: "₵218,400",
    trend: "up",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-009",
    name: "Washing Machine",
    description: "Automatic front-loading washing machine",
    price: "₵1,200.00",
    category: "Appliances",
    stock: 6,
    status: "low_stock",
    orders: 18,
    revenue: "₵21,600",
    trend: "down",
    image: "https://images.unsplash.com/photo-1610557892370-4f2e2d9439ed?w=100&h=100&fit=crop"
  },
  {
    id: "PROD-010",
    name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: "₵450.00",
    category: "Furniture",
    stock: 25,
    status: "active",
    orders: 67,
    revenue: "₵30,150",
    trend: "up",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop"
  }
];

const categories = ["All", "Main Course", "Snacks", "Beverages", "Electronics", "Appliances", "Furniture"];

const statusColors = {
  active: "default",
  low_stock: "secondary", 
  out_of_stock: "destructive"
} as const;

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold text-foreground">67</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+5</span>
                  <span className="ml-2 text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                <p className="text-3xl font-bold text-foreground">54</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+8%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-3xl font-bold text-foreground">8</p>
                <div className="flex items-center text-xs">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">-2</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-3xl font-bold text-foreground">5</p>
                <div className="flex items-center text-xs text-destructive">
                  <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full">+1</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-destructive" />
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
              <CardDescription>Manage your products and inventory</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <List className="w-4 h-4" />
                </Button>
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
                    <DialogDescription>Create a new product for your catalog</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" placeholder="e.g., Samsung Smart TV" />
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
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="appliances">Appliances</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
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

          {/* Products Display */}
          {viewMode === "cards" ? (
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
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="font-medium">{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.orders}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {product.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                          <span>{product.revenue}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[product.status as keyof typeof statusColors]}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
