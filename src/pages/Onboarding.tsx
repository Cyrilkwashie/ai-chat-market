import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Store, 
  MapPin, 
  Phone, 
  CreditCard, 
  Globe, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 4;

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);
  
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    location: "",
    phone: "",
    whatsapp: "",
    paymentMethods: [] as string[],
    languages: [] as string[],
    workingHours: "",
    deliveryAreas: [] as string[]
  });

  const businessTypes = [
    "Restaurant/Food", "Fashion/Clothing", "Electronics", "Health/Beauty", 
    "Home/Garden", "Education", "Services", "Other"
  ];

  const paymentOptions = [
    { id: "mtn", label: "MTN Mobile Money" },
    { id: "vodafone", label: "Vodafone Cash" },
    { id: "telecel", label: "Telecel Cash" },
    { id: "paystack", label: "Paystack (Cards)" },
    { id: "cash", label: "Cash on Delivery" }
  ];

  const languageOptions = [
    { id: "english", label: "English" },
    { id: "pidgin", label: "Pidgin" },
    { id: "twi", label: "Twi" },
    { id: "hausa", label: "Hausa" },
    { id: "yoruba", label: "Yoruba" }
  ];

  const deliveryAreas = [
    { id: "accra", label: "Accra" },
    { id: "kumasi", label: "Kumasi" },
    { id: "tamale", label: "Tamale" },
    { id: "cape-coast", label: "Cape Coast" },
    { id: "sekondi-takoradi", label: "Sekondi-Takoradi" },
    { id: "ho", label: "Ho" },
    { id: "koforidua", label: "Koforidua" },
    { id: "sunyani", label: "Sunyani" },
    { id: "wa", label: "Wa" },
    { id: "bolgatanga", label: "Bolgatanga" },
    { id: "worldwide", label: "Worldwide" }
  ];

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding - save to database
      setLoading(true);
      try {
        if (!user) return;

        const { error } = await supabase
          .from('profiles')
          .update({
            business_name: formData.businessName,
            business_type: formData.businessType,
            description: formData.description,
            location: formData.location,
            phone: formData.phone,
            working_hours: formData.workingHours,
            payment_methods: formData.paymentMethods,
            delivery_areas: formData.deliveryAreas,
            full_name: formData.businessName // Use business name as display name
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error saving profile",
            description: "There was an error saving your business profile. Please try again.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "🎉 Welcome to AfriCommerce!",
          description: "Your business profile is ready. Let's start selling!",
        });
        navigate("/dashboard");
      } catch (error) {
        console.error('Error during onboarding:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayToggle = (field: "paymentMethods" | "languages" | "deliveryAreas", value: string) => {
    const currentArray = formData[field];
    
    // Special handling for delivery areas - if worldwide is selected, clear others
    if (field === "deliveryAreas") {
      if (value === "worldwide") {
        setFormData({
          ...formData,
          [field]: ["worldwide"]
        });
        return;
      }
      
      // If selecting a city while worldwide is selected, remove worldwide
      if (currentArray.includes("worldwide")) {
        setFormData({
          ...formData,
          [field]: [value]
        });
        return;
      }
    }
    
    if (currentArray.includes(value)) {
      setFormData({
        ...formData,
        [field]: currentArray.filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentArray, value]
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Store className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Tell us about your business</h3>
              <p className="text-muted-foreground">Basic information to get started</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="e.g. Mama Akoto's Kitchen"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you sell and what makes your business special..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Location & Contact</h3>
              <p className="text-muted-foreground">How customers can reach you</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Business Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. East Legon, Accra"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +233 24 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  placeholder="e.g. +233 24 123 4567 (if different from phone)"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-3 block">Where do you deliver? *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryAreas.map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={area.id}
                        checked={formData.deliveryAreas.includes(area.id)}
                        onCheckedChange={() => handleArrayToggle("deliveryAreas", area.id)}
                      />
                      <Label htmlFor={area.id}>{area.label}</Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Select multiple cities or choose "Worldwide" for global delivery
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              <p className="text-muted-foreground">How customers can pay you</p>
            </div>

            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={formData.paymentMethods.includes(option.id)}
                    onCheckedChange={() => handleArrayToggle("paymentMethods", option.id)}
                  />
                  <Label htmlFor={option.id} className="flex-1">{option.label}</Label>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Mobile money is the most popular payment method in Ghana. 
                We recommend enabling at least MTN Mobile Money and Vodafone Cash.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Business Hours</h3>
              <p className="text-muted-foreground">Set your operating schedule</p>
            </div>

            <div className="space-y-4">

              <div>
                <Label htmlFor="workingHours">Working Hours</Label>
                <Select onValueChange={(value) => handleInputChange("workingHours", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When are you open?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24/7">24/7</SelectItem>
                    <SelectItem value="9-17">9 AM - 5 PM</SelectItem>
                    <SelectItem value="8-20">8 AM - 8 PM</SelectItem>
                    <SelectItem value="6-22">6 AM - 10 PM</SelectItem>
                    <SelectItem value="custom">Custom hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🤖 Your AI Assistant Will:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Take orders and process payments</li>
                  <li>• Handle delivery coordination</li>
                  <li>• Send order updates via WhatsApp</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType;
      case 2:
        return formData.location && formData.phone && formData.deliveryAreas.length > 0;
      case 3:
        return formData.paymentMethods.length > 0;
      case 4:
        return formData.workingHours;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">AfriCommerce</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome! Let's set up your business
          </h1>
          <p className="text-muted-foreground">
            This will only take a few minutes
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <Badge variant="secondary">{Math.round((currentStep / totalSteps) * 100)}% Complete</Badge>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
        </div>

        {/* Content */}
        <Card className="card-elevated">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                variant={currentStep === totalSteps ? "hero" : "default"}
              >
                {loading ? "Saving..." : currentStep === totalSteps ? (
                  <>
                    Complete Setup <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;