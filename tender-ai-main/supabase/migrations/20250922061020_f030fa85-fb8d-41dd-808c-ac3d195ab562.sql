-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create tenders table
CREATE TABLE public.tenders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tender_id TEXT NOT NULL UNIQUE,
  organization TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  value BIGINT NOT NULL,
  deadline DATE NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for tenders (public read access)
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;

-- Create policies for tenders (everyone can read)
CREATE POLICY "Tenders are viewable by everyone" 
ON public.tenders 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenders_updated_at
  BEFORE UPDATE ON public.tenders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample tenders data
INSERT INTO public.tenders (tender_id, organization, category, location, value, deadline, description, link) VALUES
('T001', 'Department of Transportation', 'Infrastructure', 'California, USA', 2500000, '2024-12-15', 'Smart traffic management system implementation for major highways in California. Includes AI-powered traffic flow optimization and real-time monitoring systems.', 'https://example.com/tender/1'),
('T002', 'Ministry of Health', 'Healthcare', 'Ontario, Canada', 1800000, '2024-11-30', 'Digital health records modernization project. Requires expertise in cloud computing, data security, and healthcare compliance standards.', 'https://example.com/tender/2'),
('T003', 'City of Austin', 'Energy', 'Texas, USA', 4200000, '2024-10-20', 'Solar energy infrastructure development for municipal buildings. Focus on sustainable energy solutions and smart grid integration.', 'https://example.com/tender/3'),
('T004', 'Federal Aviation Administration', 'Technology', 'Washington, USA', 3200000, '2024-11-15', 'Next-generation air traffic control system upgrade. Implementation of AI-based flight path optimization and weather prediction systems.', 'https://example.com/tender/4'),
('T005', 'European Space Agency', 'Aerospace', 'Paris, France', 8500000, '2025-01-31', 'Satellite communication infrastructure for remote sensing and earth observation. Requires expertise in space technology and data processing.', 'https://example.com/tender/5');