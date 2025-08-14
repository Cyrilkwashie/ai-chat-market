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
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Store, 
  MapPin, 
  CreditCard, 
  Globe, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Basic auth form data
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });

  // Business profile data for signup flow
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    location: "",
    phone: "",
    whatsapp: "",
    paymentMethods: [] as string[],
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

  // Set signup mode if coming from "Get Started"
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(authData.email, authData.password);
        if (!error) {
          // Check if there's pending business data from signup
          const pendingData = localStorage.getItem('pendingBusinessData');
          if (pendingData) {
            try {
              const businessInfo = JSON.parse(pendingData);
              
              // Get current user to update profile
              const { data: { user: currentUser } } = await supabase.auth.getUser();
              if (currentUser) {
                const { error: profileError } = await supabase
                  .from('profiles')
                  .update({
                    business_name: businessInfo.businessName,
                    business_type: businessInfo.businessType,
                    description: businessInfo.description,
                    location: businessInfo.location,
                    phone: businessInfo.phone,
                    whatsapp: businessInfo.whatsapp,
                    working_hours: businessInfo.workingHours,
                    payment_methods: businessInfo.paymentMethods,
                    delivery_areas: businessInfo.deliveryAreas,
                    full_name: businessInfo.fullName
                  })
                  .eq('user_id', currentUser.id);

                if (!profileError) {
                  localStorage.removeItem('pendingBusinessData');
                  toast({
                    title: "🎉 Welcome to AI Chat Market!",
                    description: "Your business profile has been completed successfully!",
                  });
                } else {
                  console.error('Error updating profile:', profileError);
                  toast({
                    title: "Profile update needed",
                    description: "Please complete your profile setup in the Settings page.",
                    variant: "destructive",
                  });
                }
              }
            } catch (error) {
              console.error('Error processing pending business data:', error);
              localStorage.removeItem('pendingBusinessData');
            }
          }
          navigate("/dashboard");
        }
      } else {
        // Validate passwords match for signup
        if (authData.password !== authData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          return;
        }

        // Move to business setup steps
        setCurrentStep(2); // Start business setup after auth info
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSubmit = async () => {
    setLoading(true);
    try {
      // Create account with Supabase
      const { error: signUpError } = await signUp(authData.email, authData.password, authData.fullName);
      if (signUpError) {
        setLoading(false);
        return;
      }

      // Store business data in localStorage temporarily for after email confirmation
      localStorage.setItem('pendingBusinessData', JSON.stringify({
        businessName: businessData.businessName,
        businessType: businessData.businessType,
        description: businessData.description,
        location: businessData.location,
        phone: businessData.phone,
        whatsapp: businessData.whatsapp || businessData.phone,
        workingHours: businessData.workingHours,
        paymentMethods: businessData.paymentMethods,
        deliveryAreas: businessData.deliveryAreas,
        fullName: authData.fullName
      }));

      // Show success message about email verification
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account, then sign in to complete your profile setup.",
      });
      
      // Reset to login mode so user can sign in after email verification
      setIsLogin(true);
      setCurrentStep(1);
      setLoading(false);
      return;
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBusinessSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  const handleBusinessInputChange = (field: string, value: string) => {
    setBusinessData({ ...businessData, [field]: value });
  };

  const handleArrayToggle = (field: "paymentMethods" | "deliveryAreas", value: string) => {
    const currentArray = businessData[field];
    
    // Special handling for delivery areas - if worldwide is selected, clear others
    if (field === "deliveryAreas") {
      if (value === "worldwide") {
        setBusinessData({
          ...businessData,
          [field]: ["worldwide"]
        });
        return;
      }
      
      // If selecting a city while worldwide is selected, remove worldwide
      if (currentArray.includes("worldwide")) {
        setBusinessData({
          ...businessData,
          [field]: [value]
        });
        return;
      }
    }
    
    if (currentArray.includes(value)) {
      setBusinessData({
        ...businessData,
        [field]: currentArray.filter(item => item !== value)
      });
    } else {
      setBusinessData({
        ...businessData,
        [field]: [...currentArray, value]
      });
    }
  };

  const renderBusinessStep = () => {
    switch (currentStep) {
      case 2:
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
                  value={businessData.businessName}
                  onChange={(e) => handleBusinessInputChange("businessName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select onValueChange={(value) => handleBusinessInputChange("businessType", value)}>
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
                  value={businessData.description}
                  onChange={(e) => handleBusinessInputChange("description", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
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
                  value={businessData.location}
                  onChange={(e) => handleBusinessInputChange("location", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +233 24 123 4567"
                  value={businessData.phone}
                  onChange={(e) => handleBusinessInputChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  placeholder="e.g. +233 24 123 4567 (if different from phone)"
                  value={businessData.whatsapp}
                  onChange={(e) => handleBusinessInputChange("whatsapp", e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-3 block">Where do you deliver? *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryAreas.map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={area.id}
                        checked={businessData.deliveryAreas.includes(area.id)}
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

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              <p className="text-muted-foreground">How customers can pay you</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Payment Methods</Label>
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={businessData.paymentMethods.includes(option.id)}
                        onCheckedChange={() => handleArrayToggle("paymentMethods", option.id)}
                      />
                      <Label htmlFor={option.id} className="flex-1">{option.label}</Label>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/30 p-4 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Mobile money is the most popular payment method in Ghana. 
                    We recommend enabling at least MTN Mobile Money and Vodafone Cash.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Business Hours</h3>
              <p className="text-muted-foreground">When are you available?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workingHours">Working Hours *</Label>
                <Select onValueChange={(value) => handleBusinessInputChange("workingHours", value)}>
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
    if (currentStep === 1) {
      return authData.email && authData.password && authData.password.length >= 6 && (!isLogin || true) && 
             (isLogin || (authData.confirmPassword && authData.fullName));
    }
    switch (currentStep) {
      case 2:
        return businessData.businessName && businessData.businessType;
      case 3:
        return businessData.location && businessData.phone && businessData.deliveryAreas.length > 0;
      case 4:
        return businessData.paymentMethods.length > 0;
      case 5:
        return businessData.workingHours;
      default:
        return false;
    }
  };

  // Show multi-step signup flow
  if (!isLogin && currentStep > 1) {
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
              <span className="text-sm font-medium">Step {currentStep - 1} of {totalSteps - 1}</span>
              <Badge variant="secondary">{Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% Complete</Badge>
            </div>
            <Progress value={((currentStep - 1) / (totalSteps - 1)) * 100} className="w-full" />
          </div>

          {/* Content */}
          <Card className="card-elevated">
            <CardContent className="p-8">
              {renderBusinessStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 2}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isStepValid() || loading}
                  variant={currentStep === totalSteps ? "hero" : "default"}
                >
                  {loading ? "Creating Account..." : currentStep === totalSteps ? (
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
  }

  // Show login/signup form (step 1)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">AfriCommerce</span>
          </div>
        </div>

        <Card className="card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome back" : "Get started"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to your vendor account" 
                : "Create your account and start selling"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={authData.fullName}
                    onChange={handleAuthInputChange}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={authData.email}
                    onChange={handleAuthInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={authData.password}
                    onChange={handleAuthInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {!isLogin && authData.password && (
                  <div className="mt-2">
                    {authData.password.length < 6 ? (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Password must be at least 6 characters long
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Password meets requirements
                      </p>
                    )}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={authData.confirmPassword}
                      onChange={handleAuthInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" variant="hero" disabled={loading || !isStepValid()}>
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Continue Setup")}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up for free" : "Sign in instead"}
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
              >
                ← Back to home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;