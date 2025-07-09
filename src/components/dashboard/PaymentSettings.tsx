
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Smartphone, Building, TrendingUp, CheckCircle, AlertTriangle, Settings } from "lucide-react";

const paymentMethods = [
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    description: "Ghana's leading mobile money service",
    icon: Smartphone,
    status: "active",
    transactions: 1247,
    revenue: "₵8,450",
    fees: "1.5%",
    color: "bg-yellow-500"
  },
  {
    id: "vodafone-cash",
    name: "Vodafone Cash", 
    description: "Vodafone's mobile money platform",
    icon: Smartphone,
    status: "active",
    transactions: 892,
    revenue: "₵5,230",
    fees: "1.8%",
    color: "bg-red-500"
  },
  {
    id: "telecel-cash",
    name: "Telecel Cash",
    description: "AirtelTigo mobile money service",
    icon: Smartphone,
    status: "active", 
    transactions: 456,
    revenue: "₵2,840",
    fees: "2.0%",
    color: "bg-blue-500"
  },
  {
    id: "paystack",
    name: "Paystack",
    description: "Card payments and bank transfers",
    icon: CreditCard,
    status: "active",
    transactions: 234,
    revenue: "₵3,670",
    fees: "2.9% + ₵0.50",
    color: "bg-green-500"
  },
  {
    id: "flutterwave", 
    name: "Flutterwave",
    description: "International and local payments",
    icon: CreditCard,
    status: "inactive",
    transactions: 0,
    revenue: "₵0",
    fees: "3.8%",
    color: "bg-orange-500"
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    description: "Pay when order is delivered",
    icon: Building,
    status: "active",
    transactions: 567,
    revenue: "₵4,120",
    fees: "Free",
    color: "bg-gray-500"
  }
];

const recentTransactions = [
  { id: "TXN001", customer: "Kwame Asante", amount: "₵15.00", method: "MTN MoMo", status: "completed", time: "2 min ago" },
  { id: "TXN002", customer: "Fatima Musa", amount: "₵18.50", method: "Vodafone Cash", status: "completed", time: "8 min ago" },
  { id: "TXN003", customer: "Emmanuel Osei", amount: "₵52.00", method: "Cash", status: "pending", time: "15 min ago" },
  { id: "TXN004", customer: "Adunni Lagos", amount: "₵28.00", method: "Paystack", status: "failed", time: "32 min ago" }
];

export function PaymentSettings() {
  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Configure and manage your payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                        <method.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{method.transactions} transactions</span>
                          <span>{method.revenue}</span>
                          <span>Fee: {method.fees}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={method.status === "active" ? "default" : "secondary"}>
                        {method.status}
                      </Badge>
                      <Switch checked={method.status === "active"} />
                    </div>
                  </div>
                  
                  {method.status === "active" && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Usage this month</span>
                        <span>{Math.round((method.transactions / 3396) * 100)}%</span>
                      </div>
                      <Progress value={(method.transactions / 3396) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Configuration</CardTitle>
            <CardDescription>Set up your payment gateway credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* MTN MoMo Setup */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded mr-2 flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-white" />
                  </div>
                  MTN MoMo API
                </h4>
                <Badge variant="default" className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="mtn-key" className="text-xs">API Key</Label>
                  <Input id="mtn-key" type="password" value="••••••••••••" className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mtn-user" className="text-xs">User ID</Label>
                  <Input id="mtn-user" value="user_12345" className="text-sm" />
                </div>
              </div>
            </div>

            {/* Paystack Setup */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded mr-2 flex items-center justify-center">
                    <CreditCard className="w-3 h-3 text-white" />
                  </div>
                  Paystack
                </h4>
                <Badge variant="default" className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="space-y-1">
                <Label htmlFor="paystack-key" className="text-xs">Secret Key</Label>
                <Input id="paystack-key" type="password" value="sk_test_••••••••••••" className="text-sm" />
              </div>
            </div>

            {/* Flutterwave Setup */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-2 flex items-center justify-center">
                    <CreditCard className="w-3 h-3 text-white" />
                  </div>
                  Flutterwave
                </h4>
                <Badge variant="secondary" className="flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Not Setup
                </Badge>
              </div>
              <div className="space-y-1">
                <Label htmlFor="flutter-key" className="text-xs">Secret Key</Label>
                <Input id="flutter-key" placeholder="Enter your Flutterwave secret key" className="text-sm" />
              </div>
              <Button size="sm" className="w-full">
                <Settings className="w-3 h-3 mr-2" />
                Configure Flutterwave
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{transaction.customer}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{transaction.id}</span>
                      <span>•</span>
                      <span>{transaction.method}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <Badge 
                      variant={
                        transaction.status === "completed" ? "default" :
                        transaction.status === "pending" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
