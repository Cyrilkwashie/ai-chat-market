import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Package, TrendingUp, Grid3X3, List, Upload, Link2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

export function ProductManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
    image_url: ""
  });
  const [imageUploadMethod, setImageUploadMethod] = useState<"url" | "upload">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSKU = () => {
    const nextId = (products.length + 1).toString().padStart(7, '0');
    return nextId;
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    try {
      let finalImageUrl = newProduct.image_url;

      // Handle file upload if upload method is selected and file exists
      if (imageUploadMethod === "upload" && selectedFile) {
        finalImageUrl = await handleFileUpload(selectedFile);
      }

      // Always generate SKU
      const finalSku = generateSKU();

      const stockQty = parseInt(newProduct.stock_quantity);

      const { error } = await supabase
        .from('products')
        .insert({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock_quantity: stockQty,
          initial_stock_quantity: stockQty,
          sku: finalSku,
          image_url: finalImageUrl,
          user_id: user.id,
          status: 'active'
        });

      if (error) throw error;

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock_quantity: "",
        image_url: ""
      });
      setSelectedFile(null);
      setImagePreview("");
      setIsAddProductOpen(false);
      fetchProducts();

      toast({
        title: "Success",
        description: "Product added successfully",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          price: parseFloat(editingProduct.price),
          category: editingProduct.category,
          stock_quantity: parseInt(editingProduct.stock_quantity),
          sku: editingProduct.sku,
          image_url: editingProduct.image_url
        })
        .eq('id', editingProduct.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEditingProduct(null);
      fetchProducts();

      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchProducts();

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setSelectedFile(null);
    if (imageUploadMethod === "url") {
      setNewProduct({ ...newProduct, image_url: "" });
    }
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

    const initialStock = product.initial_stock_quantity || product.stock_quantity;
    const currentStock = product.stock_quantity;
    const remainingPercentage = (currentStock / initialStock) * 100;
    
    let matchesStock = true;
    if (stockFilter === "active") {
      matchesStock = currentStock > 0 && remainingPercentage > 30;
    } else if (stockFilter === "low-stock") {
      matchesStock = remainingPercentage <= 30 && currentStock > 0;
    } else if (stockFilter === "out-of-stock") {
      matchesStock = currentStock === 0;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const productStats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => {
      const initialStock = p.initial_stock_quantity || p.stock_quantity;
      const currentStock = p.stock_quantity;
      const remainingPercentage = (currentStock / initialStock) * 100;
      return remainingPercentage <= 30 && currentStock > 0;
    }).length,
    outOfStock: products.filter(p => p.stock_quantity === 0).length
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{productStats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-green-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{productStats.active}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-orange-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{productStats.lowStock}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-red-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{productStats.outOfStock}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Management */}
      <Card className="shadow-warm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-base sm:text-lg">Product Management</CardTitle>
            <CardDescription className="text-sm">Manage your product catalog and inventory</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new product for your catalog</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Jollof Rice with Chicken"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => {
                        const words = countWords(e.target.value);
                        if (words <= 60) {
                          setNewProduct({ ...newProduct, description: e.target.value });
                        }
                      }}
                      placeholder="Describe your product..."
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {countWords(newProduct.description)}/60 words
                    </div>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <Label>Product Image</Label>
                    <Tabs value={imageUploadMethod} onValueChange={(value) => setImageUploadMethod(value as "url" | "upload")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url" className="flex items-center gap-2">
                          <Link2 className="w-4 h-4" />
                          Image URL
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload File
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="url" className="space-y-2">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={newProduct.image_url}
                          onChange={(e) => {
                            setNewProduct({ ...newProduct, image_url: e.target.value });
                            setImagePreview(e.target.value);
                          }}
                        />
                      </TabsContent>
                      <TabsContent value="upload" className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </TabsContent>
                    </Tabs>
                    {imagePreview && (
                      <div className="mt-2 relative inline-block">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded-md border"
                          onError={() => setImagePreview("")}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₵)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="15.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock_quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select or type category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        className="mt-2"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        placeholder="Or type new category"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Add Product
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
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock Levels</SelectItem>
                <SelectItem value="active">Active (&gt;30%)</SelectItem>
                <SelectItem value="low-stock">Low Stock (≤30%)</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                 <Card key={product.id} className="hover-lift">
                   <CardContent className="p-4">
                     <div className="space-y-3">
                        {product.image_url && (
                          <div className="w-full h-32 rounded-md overflow-hidden flex items-center justify-center bg-muted">
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                       <div className="flex items-start justify-between">
                         <div className="flex-1">
                           <h3 className="font-medium text-sm">{product.name}</h3>
                           <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                         </div>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setEditingProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Update product information</DialogDescription>
                              </DialogHeader>
                              {editingProduct && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-name">Product Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingProduct.name}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    />
                                  </div>
                                   <div>
                                     <Label htmlFor="edit-description">Description</Label>
                                     <Textarea
                                       id="edit-description"
                                       value={editingProduct.description || ""}
                                       onChange={(e) => {
                                         const words = countWords(e.target.value);
                                         if (words <= 60) {
                                           setEditingProduct({ ...editingProduct, description: e.target.value });
                                         }
                                       }}
                                     />
                                     <div className="text-xs text-muted-foreground mt-1">
                                       {countWords(editingProduct.description || "")}/60 words
                                     </div>
                                   </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-price">Price (₵)</Label>
                                      <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-stock">Stock Quantity</Label>
                                      <Input
                                        id="edit-stock"
                                        type="number"
                                        value={editingProduct.stock_quantity}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="edit-image">Image URL</Label>
                                     <Input
                                       id="edit-image"
                                       value={editingProduct.image_url || ""}
                                       onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                       placeholder="https://example.com/image.jpg"
                                     />
                                      {editingProduct.image_url && (
                                        <div className="mt-2 relative inline-block">
                                          <img 
                                            src={editingProduct.image_url} 
                                            alt="Product" 
                                            className="w-20 h-20 object-cover rounded-md border"
                                            onError={(e) => {
                                              e.currentTarget.style.display = 'none';
                                            }}
                                          />
                                          <button
                                            type="button"
                                            onClick={() => setEditingProduct({ ...editingProduct, image_url: "" })}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        </div>
                                      )}
                                   </div>
                                   <div>
                                     <Label htmlFor="edit-category">Category</Label>
                                     <Select value={editingProduct.category || ""} onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select category" />
                                       </SelectTrigger>
                                       <SelectContent>
                                         {categories.map(category => (
                                           <SelectItem key={category} value={category}>{category}</SelectItem>
                                         ))}
                                       </SelectContent>
                                     </Select>
                                     <Input
                                       className="mt-2"
                                       value={editingProduct.category || ""}
                                       onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                       placeholder="Or type new category"
                                     />
                                   </div>
                                  </div>
                                  <Button onClick={handleEditProduct} className="w-full">
                                    Update Product
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
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={product.category ? "secondary" : "outline"} className="text-xs">
                          {product.category || "No Category"}
                        </Badge>
                         <Badge 
                           variant={
                             (() => {
                               const initialStock = product.initial_stock_quantity || product.stock_quantity;
                               const currentStock = product.stock_quantity;
                               const remainingPercentage = (currentStock / initialStock) * 100;
                               
                               if (currentStock === 0) return "destructive";
                               if (remainingPercentage <= 30) return "secondary";
                               return "default";
                             })()
                           } 
                           className="text-xs"
                         >
                           {product.stock_quantity} in stock
                         </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-primary font-medium">₵{parseFloat(product.price?.toString() || "0").toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{product.sku || "No SKU"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                   <TableRow key={product.id}>
                     <TableCell>
                       <div className="flex items-center gap-3">
                         {product.image_url && (
                           <img 
                             src={product.image_url} 
                             alt={product.name}
                             className="w-12 h-12 object-cover rounded-md border"
                             onError={(e) => {
                               e.currentTarget.style.display = 'none';
                             }}
                           />
                         )}
                         <div>
                           <p className="font-medium">{product.name}</p>
                           <p className="text-xs text-muted-foreground">{product.description}</p>
                         </div>
                       </div>
                     </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category || "No Category"}</Badge>
                    </TableCell>
                    <TableCell>₵{parseFloat(product.price?.toString() || "0").toFixed(2)}</TableCell>
                     <TableCell>
                       <Badge 
                         variant={
                           (() => {
                             const initialStock = product.initial_stock_quantity || product.stock_quantity;
                             const currentStock = product.stock_quantity;
                             const remainingPercentage = (currentStock / initialStock) * 100;
                             
                             if (currentStock === 0) return "destructive";
                             if (remainingPercentage <= 30) return "secondary";
                             return "default";
                           })()
                         }
                       >
                         {product.stock_quantity}
                       </Badge>
                     </TableCell>
                    <TableCell>{product.sku || "N/A"}</TableCell>
                     <TableCell>
                       <div className="flex gap-1">
                         <Dialog>
                           <DialogTrigger asChild>
                             <Button 
                               variant="ghost" 
                               size="sm"
                               onClick={() => setEditingProduct(product)}
                             >
                               <Edit className="h-4 w-4" />
                             </Button>
                           </DialogTrigger>
                           <DialogContent>
                             <DialogHeader>
                               <DialogTitle>Edit Product</DialogTitle>
                               <DialogDescription>Update product information</DialogDescription>
                             </DialogHeader>
                             {editingProduct && (
                               <div className="space-y-4">
                                 <div>
                                   <Label htmlFor="table-edit-name">Product Name</Label>
                                   <Input
                                     id="table-edit-name"
                                     value={editingProduct.name}
                                     onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                   />
                                 </div>
                                 <div>
                                   <Label htmlFor="table-edit-description">Description</Label>
                                   <Textarea
                                     id="table-edit-description"
                                     value={editingProduct.description || ""}
                                     onChange={(e) => {
                                       const words = countWords(e.target.value);
                                       if (words <= 60) {
                                         setEditingProduct({ ...editingProduct, description: e.target.value });
                                       }
                                     }}
                                   />
                                   <div className="text-xs text-muted-foreground mt-1">
                                     {countWords(editingProduct.description || "")}/60 words
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="table-edit-price">Price (₵)</Label>
                                     <Input
                                       id="table-edit-price"
                                       type="number"
                                       step="0.01"
                                       value={editingProduct.price}
                                       onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="table-edit-stock">Stock Quantity</Label>
                                     <Input
                                       id="table-edit-stock"
                                       type="number"
                                       value={editingProduct.stock_quantity}
                                       onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: e.target.value })}
                                     />
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="table-edit-image">Image URL</Label>
                                    <Input
                                      id="table-edit-image"
                                      value={editingProduct.image_url || ""}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                      placeholder="https://example.com/image.jpg"
                                    />
                                    {editingProduct.image_url && (
                                      <div className="mt-2 relative inline-block">
                                        <img 
                                          src={editingProduct.image_url} 
                                          alt="Product" 
                                          className="w-20 h-20 object-cover rounded-md border"
                                          onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setEditingProduct({ ...editingProduct, image_url: "" })}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor="table-edit-category">Category</Label>
                                    <Select value={editingProduct.category || ""} onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map(category => (
                                          <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <Input
                                      className="mt-2"
                                      value={editingProduct.category || ""}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                      placeholder="Or type new category"
                                    />
                                  </div>
                                 </div>
                                 <Button onClick={handleEditProduct} className="w-full">
                                   Update Product
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
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
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