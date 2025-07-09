import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, Bot, User, Phone, Clock, CheckCircle, AlertTriangle, TrendingUp, Settings, Zap, Globe, MessageSquare } from "lucide-react";

const activeChats = [
  {
    id: "chat-001",
    customer: "Kwame Asante",
    phone: "+233 20 123 4567",
    lastMessage: "I want to order jollof rice",
    timestamp: "2 min ago",
    status: "pending",
    language: "English",
    platform: "WhatsApp"
  },
  {
    id: "chat-002", 
    customer: "Fatima Musa",
    phone: "+233 24 987 6543",
    lastMessage: "Ina waakye?",
    timestamp: "5 min ago",
    status: "ai_handled",
    language: "Hausa",
    platform: "WhatsApp"
  },
  {
    id: "chat-003",
    customer: "Emmanuel Osei",
    phone: "+233 50 555 7777", 
    lastMessage: "How much be the banku?",
    timestamp: "8 min ago",
    status: "completed",
    language: "Pidgin",
    platform: "WhatsApp"
  }
];

const aiPerformance = [
  { metric: "Response Time", value: "2.3 sec", target: "< 3 sec", status: "good" },
  { metric: "Resolution Rate", value: "94%", target: "> 90%", status: "excellent" },
  { metric: "Customer Satisfaction", value: "97%", target: "> 95%", status: "excellent" },
  { metric: "Escalation Rate", value: "6%", target: "< 10%", status: "good" }
];

const commonQueries = [
  { query: "Menu prices", count: 47, percentage: 32 },
  { query: "Delivery time", count: 34, percentage: 23 },
  { query: "Payment methods", count: 28, percentage: 19 },
  { query: "Order status", count: 22, percentage: 15 },
  { query: "Location/directions", count: 16, percentage: 11 }
];

export function ChatSupport() {
  const [selectedChat, setSelectedChat] = useState(activeChats[0]);
  const [chatbotActive, setChatbotActive] = useState(true);
  const [businessName, setBusinessName] = useState("My Restaurant");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! Welcome to our restaurant. How can I help you today?");
  const [businessDescription, setBusinessDescription] = useState("We serve delicious local dishes with fast delivery.");
  const [autoConfirmOrders, setAutoConfirmOrders] = useState(false);
  const [sendReceipts, setSendReceipts] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [communicationTone, setCommunicationTone] = useState("friendly");
  const [customPersonality, setCustomPersonality] = useState("");
  const [fallbackResponses, setFallbackResponses] = useState("I'm sorry, I didn't understand that. Could you please rephrase?");
  const [flutterwaveEnabled, setFlutterwaveEnabled] = useState(false);
  const [paystackEnabled, setPaystackEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Chatbot Configuration Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Chatbot Configuration
              </CardTitle>
              <CardDescription>
                Customize your AI-powered conversational commerce assistant
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={chatbotActive ? "default" : "secondary"}>
                {chatbotActive ? "Active" : "Inactive"}
              </Badge>
              <Switch
                checked={chatbotActive}
                onCheckedChange={setChatbotActive}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="personality" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Personality
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="languages" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Languages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <Input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Welcome Message</label>
                    <Textarea
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Enter your welcome message"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Description</label>
                    <Textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Describe your business"
                      rows={3}
                    />
                  </div>
                  <Button variant="default" className="w-full">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Auto-confirm orders</label>
                      <p className="text-xs text-muted-foreground">
                        Automatically confirm orders without manual intervention
                      </p>
                    </div>
                    <Switch
                      checked={autoConfirmOrders}
                      onCheckedChange={setAutoConfirmOrders}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Send order receipts</label>
                      <p className="text-xs text-muted-foreground">
                        Send receipt messages after order completion
                      </p>
                    </div>
                    <Switch
                      checked={sendReceipts}
                      onCheckedChange={setSendReceipts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Inventory alerts</label>
                      <p className="text-xs text-muted-foreground">
                        Notify about low stock items
                      </p>
                    </div>
                    <Switch
                      checked={inventoryAlerts}
                      onCheckedChange={setInventoryAlerts}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chatbot Personality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Communication Tone</label>
                    <Select value={communicationTone} onValueChange={setCommunicationTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Casual</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="warm">Warm & Personal</SelectItem>
                        <SelectItem value="energetic">Energetic & Enthusiastic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Personality Prompt</label>
                    <Textarea
                      value={customPersonality}
                      onChange={(e) => setCustomPersonality(e.target.value)}
                      placeholder="Add custom instructions for your chatbot's personality..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fallback Responses</label>
                    <Textarea
                      value={fallbackResponses}
                      onChange={(e) => setFallbackResponses(e.target.value)}
                      placeholder="Default replies when the bot doesn't understand..."
                      rows={3}
                    />
                  </div>
                  <Button variant="default" className="w-full">
                    Update Personality
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your WhatsApp Business account to enable chatbot functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Connect WhatsApp
                  </Button>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input
                      value="https://your-webhook-url.com/whatsapp"
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Integration</CardTitle>
                  <CardDescription>
                    Enable payment processing through your chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Flutterwave</p>
                      <p className="text-sm text-muted-foreground">
                        Accept payments via Flutterwave gateway
                      </p>
                    </div>
                    <Switch
                      checked={flutterwaveEnabled}
                      onCheckedChange={setFlutterwaveEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Paystack</p>
                      <p className="text-sm text-muted-foreground">
                        Accept payments via Paystack gateway
                      </p>
                    </div>
                    <Switch
                      checked={paystackEnabled}
                      onCheckedChange={setPaystackEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="languages" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Configure language support for your chatbot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Language</label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="twi">Twi</SelectItem>
                        <SelectItem value="hausa">Hausa</SelectItem>
                        <SelectItem value="pidgin">Pidgin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Additional Languages</label>
                    <div className="space-y-2">
                      {["Twi", "Hausa", "Pidgin", "French"].map((lang) => (
                        <div key={lang} className="flex items-center space-x-2">
                          <input type="checkbox" id={lang} className="rounded" />
                          <label htmlFor={lang} className="text-sm">{lang}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Enhanced AI Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-3xl font-bold text-foreground">2.3 sec</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">-0.2s</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                <p className="text-3xl font-bold text-foreground">94%</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+2%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                <p className="text-3xl font-bold text-foreground">97%</p>
                <div className="flex items-center text-xs text-success">
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full">+2%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Escalation Rate</p>
                <p className="text-3xl font-bold text-foreground">6%</p>
                <div className="flex items-center text-xs">
                  <span className="bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">-1%</span>
                  <span className="ml-2 text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Conversations</CardTitle>
            <CardDescription>Customer chats requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeChats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat.id === chat.id ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{chat.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{chat.customer}</p>
                          <Badge 
                            variant={
                              chat.status === "pending" ? "destructive" : 
                              chat.status === "ai_handled" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {chat.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{chat.lastMessage}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{chat.timestamp}</span>
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="text-xs">{chat.language}</Badge>
                            <MessageCircle className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedChat.customer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedChat.customer}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>{selectedChat.phone}</span>
                    <Badge variant="outline" className="text-xs">{selectedChat.language}</Badge>
                  </CardDescription>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Escalate</Button>
                <Button size="sm">Take Over</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-96 border border-border rounded-lg p-4 overflow-y-auto space-y-4">
                <div className="flex items-start space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-muted">
                      {selectedChat.customer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg max-w-xs">
                    <p className="text-sm">{selectedChat.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedChat.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 flex-row-reverse">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hello! I can help you with that. Our jollof rice costs ₵15 and comes with grilled chicken. Would you like to place an order?</p>
                    <p className="text-xs opacity-70 mt-1">1 min ago</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Common Queries */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Queries</CardTitle>
            <CardDescription>What customers ask about most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonQueries.map((query, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{query.query}</span>
                    <span className="text-sm text-muted-foreground">{query.count} times</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${query.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{query.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Training Status */}
        <Card>
          <CardHeader>
            <CardTitle>AI Training & Setup</CardTitle>
            <CardDescription>Configure your AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Response Style</label>
                  <Select defaultValue="friendly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-escalation After</label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 failed attempt</SelectItem>
                      <SelectItem value="3">3 failed attempts</SelectItem>
                      <SelectItem value="5">5 failed attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="training" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Menu knowledge</span>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Pricing information</span>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-secondary" />
                      <span className="text-sm">Local slang patterns</span>
                    </div>
                    <Badge variant="secondary">Training</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
