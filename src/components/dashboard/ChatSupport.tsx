import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Bot, User, Phone, Clock, CheckCircle, AlertTriangle } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* AI Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiPerformance.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.metric}</div>
                  <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  metric.status === "excellent" ? "bg-success" : "bg-primary"
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
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