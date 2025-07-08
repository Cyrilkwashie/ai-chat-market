import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI shopping assistant. I can help you find delicious local food in Ghana. What are you craving today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const predefinedResponses = [
    {
      trigger: ["jollof", "rice"],
      response: "Great choice! I found 3 amazing jollof rice options near you in Accra:\n\n🍛 **Mama Ama's Kitchen** - ₵15 (with chicken)\n⭐ 4.8/5 • 15 min delivery\n\n🍛 **Osu Food Corner** - ₵12 (with beef)\n⭐ 4.6/5 • 20 min delivery\n\n🍛 **Golden Rice** - ₵18 (special blend)\n⭐ 4.9/5 • 12 min delivery\n\nWhich one interests you?"
    },
    {
      trigger: ["waakye"],
      response: "Perfect! Waakye is so popular today! Here are the best options:\n\n🍚 **Auntie Akos** - ₵8 (with egg and gari)\n⭐ 4.7/5 • 18 min delivery\n\n🍚 **Waakye Junction** - ₵10 (with fish and spaghetti)\n⭐ 4.5/5 • 25 min delivery\n\nBoth come with shito and salad. Which would you prefer?"
    },
    {
      trigger: ["delivery", "time"],
      response: "Our motorcycle delivery partners can reach you in Accra within 15-30 minutes depending on your location. We cover Greater Accra, Osu, East Legon, and Tema. What's your delivery address?"
    },
    {
      trigger: ["payment", "pay"],
      response: "We accept multiple payment methods:\n💳 Mobile Money (MTN, Vodafone, AirtelTigo)\n💵 Cash on delivery\n🏦 Bank transfer\n\nMobile Money is most popular and instant! Which would you prefer?"
    }
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const response of predefinedResponses) {
      if (response.trigger.some(trigger => message.includes(trigger))) {
        return response.response;
      }
    }
    
    return "That sounds interesting! I can help you find local restaurants and food vendors. Try asking me about jollof rice, waakye, delivery options, or payment methods. What would you like to explore?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Chat Header */}
        <div className="flex items-center space-x-2 pb-4 border-b border-border">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">AfriCommerce Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarFallback className={message.type === 'user' ? 'bg-accent' : 'bg-primary text-primary-foreground'}>
                    {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2 pt-4 border-t border-border">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about food, delivery, or payments..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;