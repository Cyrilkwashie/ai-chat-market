import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ShoppingCart, 
  BarChart3, 
  Smartphone, 
  Users, 
  Truck,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-commerce.jpg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AfriCommerce</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-smooth">Contact</a>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  🌍 Built for African Markets
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Conversational
                  <span className="block hero-gradient bg-clip-text text-transparent">
                    Commerce
                  </span>
                  for Africa
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Empower your business with AI-powered chatbots that understand local languages, 
                  accept mobile money, and connect with customers across Ghana, Nigeria, and beyond.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  Start Selling <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => navigate("/chat")}
                >
                  Try Shopping <MessageCircle className="ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Local payment methods</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>24/7 AI support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="card-elevated rounded-xl overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="African commerce platform" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-3 rounded-full shadow-warm">
                <Star className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-success text-success-foreground p-3 rounded-full shadow-warm">
                <Truck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Vendors", value: "1,200+", icon: Users },
              { label: "Daily Orders", value: "8,500+", icon: ShoppingCart },
              { label: "Cities Served", value: "25+", icon: MapPin },
              { label: "Customer Satisfaction", value: "98%", icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run your business and serve customers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Sales Dashboard
                </CardTitle>
                <CardDescription>
                  Track your sales, orders, and customer insights in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">₵2,450</div>
                  <div className="text-sm text-muted-foreground">Today's Revenue</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">24</div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">18</div>
                    <div className="text-xs text-muted-foreground">Customers</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">95%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-primary" />
                  Mobile Management
                </CardTitle>
                <CardDescription>
                  Manage your business on the go with our mobile-first design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {["Add new products", "Process orders", "Chat with customers", "Track deliveries"].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold">AfriCommerce</span>
              </div>
              <p className="text-background/70">
                Empowering African businesses with conversational commerce
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-1 text-background/70">
                <div>Dashboard</div>
                <div>Chat Interface</div>
                <div>Analytics</div>
                <div>Mobile App</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Markets</h4>
              <div className="space-y-1 text-background/70">
                <div>Ghana</div>
                <div>Nigeria</div>
                <div>Kenya (Coming Soon)</div>
                <div>South Africa (Coming Soon)</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-1 text-background/70">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>API Docs</div>
                <div>Community</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 AfriCommerce. Built with ❤️ for African entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;