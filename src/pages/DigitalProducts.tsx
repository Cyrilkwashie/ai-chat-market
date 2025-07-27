import { useState } from "react";
import { Bell, Search, Menu, Plus, Download, File, MoreHorizontal, Edit2, Trash2, Upload, TrendingUp, Package, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";

const digitalProductsData = [
  {
    id: "DP-001",
    name: "Ghanaian Recipe eBook",
    description: "Complete collection of traditional Ghanaian recipes",
    category: "eBooks",
    price: 25,
    fileInfo: {
      type: "PDF",
      size: "2.5 MB",
    },
    downloads: 45,
    revenue: 1125,
    access: "unlimited",
  },
  {
    id: "DP-002", 
    name: "Kente Pattern Templates",
    description: "Traditional kente patterns for designers",
    category: "Design Templates",
    price: 50,
    fileInfo: {
      type: "ZIP",
      size: "15.2 MB",
    },
    downloads: 23,
    revenue: 1150,
    access: "limited time",
  },
  {
    id: "DP-003",
    name: "Twi Language Course",
    description: "Learn Twi language with native speakers",
    category: "Video Courses",
    price: 75,
    fileInfo: {
      type: "MP4",
      size: "1.2 GB",
    },
    downloads: 12,
    revenue: 900,
    access: "unlimited",
  },
];

const DigitalProductsContent = () => {
  const { toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = digitalProductsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setIsAddProductOpen(false);
    toast({
      title: "Product Added",
      description: "New digital product has been successfully created.",
    });
  };

  const getAccessBadgeVariant = (access: string) => {
    return access === "unlimited" ? "default" : "secondary";
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
            <h1 className="text-lg font-semibold">Digital Products</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, products, customers..."
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
                <h2 className="text-xl md:text-2xl font-bold mb-2">Digital Products 📱</h2>
                <p className="text-white/80 text-sm md:text-base">Manage your digital downloads and online content</p>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover-lift border-l-4 border-l-primary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">3</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-accent">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Downloads</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">80</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+15%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-success">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Digital Revenue</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">₵3,175</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">+28%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-lift border-l-4 border-l-secondary">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Price</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">₵50</p>
                    <div className="flex items-center text-xs text-success">
                      <span className="bg-success/10 text-success px-2 py-1 rounded-full">Optimal</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Digital Products Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Digital Products</CardTitle>
                <CardDescription>Manage your digital products, files, and downloads</CardDescription>
              </div>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Digital Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Digital Product</DialogTitle>
                    <DialogDescription>Upload and configure your digital product. Supported formats: PDF, Video, Audio, Images, Archives.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productName">Product Name</Label>
                      <Input id="productName" placeholder="e.g., Ghanaian Recipe eBook" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ebooks">eBooks</SelectItem>
                          <SelectItem value="templates">Design Templates</SelectItem>
                          <SelectItem value="courses">Video Courses</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₵)</Label>
                      <Input id="price" type="number" placeholder="25.00" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your digital product..." />
                    </div>
                    <div>
                      <Label htmlFor="file">Upload File</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Choose file</span> or drag and drop
                        </div>
                        <input type="file" className="hidden" id="file" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accessType">Access Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select access type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unlimited">Unlimited Access</SelectItem>
                          <SelectItem value="limited">Limited Time Access</SelectItem>
                          <SelectItem value="downloads">Limited Downloads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="downloadLimit">Download Limit</Label>
                      <Input id="downloadLimit" type="number" placeholder="3" />
                    </div>
                  </div>
                  <Button onClick={handleAddProduct} className="w-full">
                    Create Digital Product
                  </Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>File Info</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>₵{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{product.fileInfo.type}</div>
                            <div className="text-sm text-muted-foreground">{product.fileInfo.size}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{product.downloads}</div>
                          <div className="text-xs text-muted-foreground">downloads</div>
                        </div>
                      </TableCell>
                      <TableCell>₵{product.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getAccessBadgeVariant(product.access)}>
                          {product.access}
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
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="mr-2 h-4 w-4" />
                              Update File
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

const DigitalProducts = () => {
  return (
    <SidebarProvider>
      <DigitalProductsContent />
    </SidebarProvider>
  );
};

export default DigitalProducts;