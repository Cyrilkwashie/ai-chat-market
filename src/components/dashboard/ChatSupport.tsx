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
import { MessageCircle, Bot, Phone, Settings, Zap, MessageSquare } from "lucide-react";

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
            <TabsList className="grid w-full grid-cols-3">
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
          </Tabs>
        </CardContent>
      </Card>

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
    </div>
  );
}
