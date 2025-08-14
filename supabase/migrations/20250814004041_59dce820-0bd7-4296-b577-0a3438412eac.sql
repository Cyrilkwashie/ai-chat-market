-- Add WhatsApp field to profiles table for the onboarding flow
ALTER TABLE public.profiles 
ADD COLUMN whatsapp text;