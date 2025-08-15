import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle business data update after email verification
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            const pendingData = localStorage.getItem('pendingBusinessData');
            console.log('Checking for pending business data:', pendingData);
            
            if (pendingData) {
              try {
                const businessInfo = JSON.parse(pendingData);
                console.log('Processing business info:', businessInfo);
                
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
                  .eq('user_id', session.user.id);
                
                console.log('Profile update result:', { profileError });
                
                if (!profileError) {
                  localStorage.removeItem('pendingBusinessData');
                  toast({
                    title: "🎉 Welcome to AI Chat Market!",
                    description: "Your business profile has been completed successfully!",
                  });
                } else {
                  console.error('Profile update error:', profileError);
                  toast({
                    title: "Profile update failed",
                    description: "Please complete your profile in settings.",
                    variant: "destructive",
                  });
                }
              } catch (error) {
                console.error('Error processing pending business data:', error);
                localStorage.removeItem('pendingBusinessData');
                toast({
                  title: "Profile setup error",
                  description: "Please complete your profile in settings.",
                  variant: "destructive",
                });
              }
            }
          }, 1000); // Increased delay to ensure profile exists
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      // Always use current origin for redirect to maintain localStorage context
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      console.log('Signup redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName || email
          }
        }
      });

      console.log('SignUp response:', { data, error });

      if (error) {
        console.log('SignUp error:', error);
        // Handle different types of signup errors
        if (error.message.includes('User already registered') || 
            error.message.includes('already registered') ||
            error.message.includes('user_repeated_signup') ||
            error.message.includes('email already exists')) {
          toast({
            title: "User already exists",
            description: "An account with this email already exists. Please use a different email or sign in instead.",
            variant: "destructive",
          });
        } else if (error.message.includes('Password should be at least')) {
          toast({
            title: "Password too weak",
            description: "Password should be at least 6 characters long.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid email')) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: error.message || "An error occurred during signup.",
            variant: "destructive",
          });
        }
      } else if (data) {
        console.log('SignUp success data:', data);
        // Check if this is a new user or existing user
        // If user exists but not confirmed, Supabase returns the user without sending email
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          // User already exists - identities array is empty for existing users
          toast({
            title: "User already exists",
            description: "An account with this email already exists. Please use a different email or sign in instead.",
            variant: "destructive",
          });
          return { error: { message: "User already exists" } };
        } else {
          // New user created
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
      
      return { error };
    } catch (error: any) {
      console.log('SignUp catch error:', error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Sign in failed",
            description: "Invalid email or password. Please check your credentials.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
      }
      
      return { error };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};