import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";

const ChatbotPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">AfriCommerce Chat</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop with Our AI Assistant
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover amazing local food and get instant support from our AI shopping assistant
            </p>
          </div>
          
          <div className="w-full max-w-2xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;