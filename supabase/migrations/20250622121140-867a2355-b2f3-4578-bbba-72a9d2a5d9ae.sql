
-- Create Alliance broadband plans table
CREATE TABLE public.alliance_plans (
  id SERIAL PRIMARY KEY,
  plan_name TEXT NOT NULL,
  speed TEXT NOT NULL, -- e.g., "40 Mbps", "100 Mbps"
  ott_apps_included TEXT, -- Number of OTT apps or "Optional"
  validity_days INTEGER NOT NULL, -- Validity in days
  base_price DECIMAL(10,2) NOT NULL, -- Price without GST
  price_with_gst DECIMAL(10,2) NOT NULL, -- Price including GST
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for demo purposes)
ALTER TABLE public.alliance_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Public access to Alliance plans" 
  ON public.alliance_plans 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_alliance_plans_updated_at
    BEFORE UPDATE ON public.alliance_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all Alliance broadband plan data
INSERT INTO public.alliance_plans (plan_name, speed, ott_apps_included, validity_days, base_price, price_with_gst) VALUES
('Launcher', '40 Mbps', '21', 30, 425.00, 501.50),
('Stream', '80 Mbps', '21', 30, 550.00, 649.00),
('Binge 40', '40 Mbps', '24', 30, 600.00, 708.00),
('Binge 100', '100 Mbps', '24', 30, 700.00, 826.00),
('Binge 150', '150 Mbps', '24', 30, 850.00, 1003.00),
('Cruise', '150 Mbps', '24', 30, 1000.00, 1180.00),
('Premium+', '175 Mbps', '24', 30, 1150.00, 1357.00),
('Speed+', '250 Mbps', '24', 30, 1500.00, 1770.00),
('Flash+', '400 Mbps', '24', 30, 2600.00, 3068.00),
('Innovator', '510 Mbps', '24', 30, 3500.00, 4130.00),
('Gigablast', '1000 Mbps', '24', 30, 7000.00, 8260.00),
('QTR 50+', '50 Mbps', '24', 90, 1770.00, 2088.60),
('Welcome 40+', '40 Mbps', '24', 90, 2100.00, 2478.00),
('QTR 150+', '150 Mbps', '24', 90, 2370.00, 2796.60),
('Welcome 150+', '150 Mbps', '24', 90, 2700.00, 3186.00),
('QTR 400+', '400 Mbps', '24', 90, 2700.00, 3186.00),
('Welcome 400+', '400 Mbps', '24', 90, 2850.00, 3363.00),
('Annual Combo 1', '200 Mbps', '24', 420, 14000.00, 16520.00),
('Annual Combo 2', '200 Mbps', '24', 365, 14000.00, 16520.00),
('Browser', '40 Mbps', 'Optional', 30, 400.00, 472.00),
('Starter', '80 Mbps', 'Optional', 30, 500.00, 590.00),
('Welcome 15', '15 Mbps', 'Optional', 90, 510.00, 601.80),
('Zoom', '100 Mbps', 'Optional', 30, 600.00, 708.00),
('IPTV Basic 50', '50 Mbps', 'Optional', 30, 600.00, 708.00),
('Prime+', '150 Mbps', 'Optional', 30, 650.00, 767.00),
('IPTV Smart 100', '100 Mbps', 'Optional', 30, 850.00, 1003.00),
('IPTV HD Lite', '150 Mbps', 'Optional', 30, 900.00, 1062.00),
('IPTV Cruise 150', '150 Mbps', 'Optional', 30, 1100.00, 1298.00),
('SME 175', '175 Mbps', 'Optional', 30, 1150.00, 1357.00),
('QTR 50', '50 Mbps', 'Optional', 90, 1350.00, 1593.00),
('SME 250', '250 Mbps', 'Optional', 30, 1500.00, 1770.00),
('Welcome 40', '40 Mbps', 'Optional', 90, 1500.00, 1770.00),
('QTR 150', '150 Mbps', 'Optional', 90, 1850.00, 2183.00),
('Welcome 150', '150 Mbps', 'Optional', 90, 2100.00, 2478.00),
('QTR 400', '400 Mbps', 'Optional', 90, 2100.00, 2478.00),
('Welcome 400', '400 Mbps', 'Optional', 90, 2250.00, 2655.00),
('Utsav 140 (3+3)', '140 Mbps', 'Optional', 180, 2550.00, 3009.00),
('SME 400', '400 Mbps', 'Optional', 30, 2600.00, 3068.00),
('SME 510', '510 Mbps', 'Optional', 30, 3500.00, 4130.00),
('Welcome 100', '100 Mbps', 'Optional', 180, 3600.00, 4248.00),
('Suraksha 50', '50 Mbps', 'Optional', 180, 4000.00, 4720.00),
('Suraksha 300', '300 Mbps', 'Optional', 150, 5000.00, 5900.00),
('Utsav 140 (6+6)', '140 Mbps', 'Optional', 360, 5100.00, 6018.00),
('Utsav 175', '175 Mbps', 'Optional', 390, 6900.00, 8142.00),
('SME 1 Gbps', '1024 Mbps', 'Optional', 30, 7000.00, 8260.00),
('Utsav 250', '250 Mbps', 'Optional', 420, 9000.00, 10620.00),
('Utsav 400', '400 Mbps', 'Optional', 450, 15600.00, 18408.00);

-- Create indexes for better search performance
CREATE INDEX idx_alliance_plans_name ON public.alliance_plans(plan_name);
CREATE INDEX idx_alliance_plans_speed ON public.alliance_plans(speed);
CREATE INDEX idx_alliance_plans_base_price ON public.alliance_plans(base_price);
CREATE INDEX idx_alliance_plans_validity ON public.alliance_plans(validity_days);
