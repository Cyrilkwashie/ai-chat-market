
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  BarChart3,
  CalendarIcon,
  FileText,
  Download,
  PieChart
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RechartsPieChart, Pie } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 8500, orders: 145, customers: 89 },
  { month: "Feb", revenue: 9200, orders: 156, customers: 95 },
  { month: "Mar", revenue: 10100, orders: 172, customers: 103 },
  { month: "Apr", revenue: 11300, orders: 189, customers: 112 },
  { month: "May", revenue: 12700, orders: 198, customers: 125 },
  { month: "Jun", revenue: 11800, orders: 183, customers: 118 }
];

const productData = [
  { name: "Waakye", value: 3500, color: "hsl(var(--primary))" },
  { name: "Kente Cloth", value: 2800, color: "hsl(var(--secondary))" },
  { name: "Sobolo", value: 2200, color: "hsl(var(--accent))" },
  { name: "Banku", value: 1900, color: "hsl(var(--destructive))" },
  { name: "Others", value: 2300, color: "hsl(240, 5%, 40%)" }
];

const topProducts = [
  { name: "Waakye", revenue: "₵3,500", sales: 245, change: "+12%" },
  { name: "Kente Cloth", revenue: "₵2,800", sales: 198, change: "+8%" },
  { name: "Sobolo", revenue: "₵2,200", sales: 167, change: "+15%" },
  { name: "Banku", revenue: "₵1,900", sales: 143, change: "+5%" },
  { name: "Kelewele", revenue: "₵1,600", sales: 128, change: "+18%" }
];

const customerSegments = [
  { name: "Returning", value: 45, color: "hsl(var(--primary))" },
  { name: "New", value: 35, color: "hsl(var(--secondary))" },
  { name: "VIP", value: 20, color: "hsl(var(--destructive))" }
];

const regions = [
  { rank: 1, name: "Greater Accra", orders: 1245, revenue: "₵45,600", avgOrder: "₵36.65" },
  { rank: 2, name: "Ashanti", orders: 987, revenue: "₵32,400", avgOrder: "₵32.82" },
  { rank: 3, name: "Northern", orders: 543, revenue: "₵18,200", avgOrder: "₵33.52" },
  { rank: 4, name: "Western", orders: 432, revenue: "₵14,800", avgOrder: "₵34.26" },
  { rank: 5, name: "Eastern", orders: 398, revenue: "₵13,100", avgOrder: "₵32.91" }
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  orders: { label: "Orders", color: "hsl(var(--secondary))" },
  customers: { label: "Customers", color: "hsl(var(--accent))" },
  value: { label: "Value", color: "hsl(var(--primary))" }
};

export function AnalyticsDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState("Monthly");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-muted-foreground">Overview of your business performance</p>
        </div>
        
        {/* Controls Row */}
        <div className="flex items-center gap-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-64 justify-start text-left font-normal")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Report Type Dropdown */}
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
            </Select>

            {/* Download Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue Card */}
        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground">₵12,700</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+23.5%</span>
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders Card */}
        <Card className="hover-lift border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold text-foreground">422</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+18.2%</span>
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Customers Card */}
        <Card className="hover-lift border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">New Customers</p>
                <p className="text-3xl font-bold text-foreground">89</p>
                <div className="flex items-center text-xs text-destructive">
                  <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full">-5.1%</span>
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value Card */}
        <Card className="hover-lift border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Average Order Value</p>
                <p className="text-3xl font-bold text-foreground">₵30.12</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+4.3%</span>
                  <span className="ml-2 text-muted-foreground">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Reports Section */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="regional">Regional Performance</TabsTrigger>
        </TabsList>

        {/* Tab 1: Sales Report */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card className="shadow-warm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Orders & Customers Chart */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Orders & Customers</CardTitle>
                <CardDescription>Monthly comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="customers" fill="var(--color-customers)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Generate Reports Section */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Download detailed reports for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  Sales Summary PDF
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  Transaction CSV
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  Tax Report PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Product Analysis */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Product Performance Pie Chart */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Revenue breakdown by products</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Products List */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.revenue}</p>
                        <Badge variant="secondary" className="text-xs">
                          {product.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Customer Insights */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Customer Segments Donut Chart */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customer types</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <RechartsPieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Customer Metrics Panel */}
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Customer Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Retention Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Order Frequency</span>
                    <span className="font-medium">2.3/month</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 4: Regional Performance */}
        <TabsContent value="regional" className="space-y-6">
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Performance across Ghana regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {regions.map((region) => (
                  <div key={region.rank} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">#{region.rank}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{region.name}</h3>
                        <p className="text-sm text-muted-foreground">{region.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{region.revenue}</p>
                      <p className="text-sm text-muted-foreground">Avg: {region.avgOrder}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
