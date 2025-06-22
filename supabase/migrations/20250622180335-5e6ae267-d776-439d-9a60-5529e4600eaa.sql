
-- Create GTPL broadband plans table
CREATE TABLE public.gtpl_broadband_plans (
  id SERIAL PRIMARY KEY,
  plan_name TEXT NOT NULL,
  speed TEXT NOT NULL, -- e.g., "40 Mbps", "100 Mbps"
  ott_apps_included TEXT, -- OTT apps included or "None"
  validity_days INTEGER NOT NULL, -- Validity in days
  base_price DECIMAL(10,2) NOT NULL, -- Price without GST
  price_with_gst DECIMAL(10,2) NOT NULL, -- Price including GST
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for demo purposes)
ALTER TABLE public.gtpl_broadband_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Public access to GTPL broadband plans" 
  ON public.gtpl_broadband_plans 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gtpl_broadband_plans_updated_at
    BEFORE UPDATE ON public.gtpl_broadband_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all GTPL broadband plan data
INSERT INTO public.gtpl_broadband_plans (plan_name, speed, ott_apps_included, validity_days, base_price, price_with_gst) VALUES
('Starter 40', '40 Mbps', 'None', 30, 400.00, 472.00),
('Boost 80', '80 Mbps', 'None', 30, 496.00, 585.28),
('Boost 100', '100 Mbps', 'None', 30, 590.00, 696.20),
('Boost 150', '150 Mbps', 'None', 30, 650.00, 767.00),
('Boost 200', '200 Mbps', 'None', 30, 1200.00, 1416.00),
('Boost 250', '250 Mbps', 'None', 30, 1400.00, 1652.00),
('Starter 40', '40 Mbps', 'None', 120, 1200.00, 1416.00),
('Boost 80', '80 Mbps', 'None', 120, 1488.00, 1755.84),
('Boost 100', '100 Mbps', 'None', 120, 1770.00, 2088.60),
('Boost 150', '150 Mbps', 'None', 120, 1950.00, 2301.00),
('Boost 200', '200 Mbps', 'None', 120, 3600.00, 4248.00),
('Boost 250', '250 Mbps', 'None', 120, 4200.00, 4956.00),
('Starter 40', '40 Mbps', 'None', 210, 2000.00, 2360.00),
('Boost 80', '80 Mbps', 'None', 210, 2480.00, 2926.40),
('Boost 100', '100 Mbps', 'None', 210, 2950.00, 3481.00),
('Boost 150', '150 Mbps', 'None', 210, 3250.00, 3835.00),
('Boost 200', '200 Mbps', 'None', 210, 6000.00, 7080.00),
('Boost 250', '250 Mbps', 'None', 210, 7000.00, 8260.00),
('Starter 40', '40 Mbps', 'None', 390, 3600.00, 4248.00),
('Boost 80', '80 Mbps', 'None', 390, 4464.00, 5267.52),
('Boost 100', '100 Mbps', 'None', 390, 5310.00, 6265.80),
('Boost 150', '150 Mbps', 'None', 390, 5850.00, 6903.00),
('Boost 200', '200 Mbps', 'None', 390, 10800.00, 12744.00),
('Boost 250', '250 Mbps', 'None', 390, 12600.00, 14868.00),
('OTT Plus 80', '80 Mbps', 'Play Box TV', 30, 649.00, 765.82),
('OTT Plus 100', '100 Mbps', 'Play Box TV', 30, 743.00, 876.74),
('OTT Plus 150', '150 Mbps', 'Play Box TV', 30, 803.00, 947.54),
('OTT Plus 200', '200 Mbps', 'Play Box TV', 30, 1353.00, 1596.54),
('OTT Plus 250', '250 Mbps', 'Play Box TV', 30, 1553.00, 1832.54),
('OTT Plus 80', '80 Mbps', 'Play Box TV', 180, 2885.00, 3404.30),
('OTT Plus 100', '100 Mbps', 'Play Box TV', 180, 3300.00, 3894.00),
('OTT Plus 150', '150 Mbps', 'Play Box TV', 180, 3550.00, 4189.00),
('OTT Plus 200', '200 Mbps', 'Play Box TV', 180, 5900.00, 6962.00),
('OTT Plus 250', '250 Mbps', 'Play Box TV', 180, 6760.00, 7976.80),
('OTT Plus 80', '80 Mbps', 'Play Box TV', 360, 5475.00, 6460.50),
('OTT Plus 100', '100 Mbps', 'Play Box TV', 360, 6260.00, 7386.80),
('OTT Plus 150', '150 Mbps', 'Play Box TV', 360, 6760.00, 7976.80),
('OTT Plus 200', '200 Mbps', 'Play Box TV', 360, 11325.00, 13363.50),
('OTT Plus 250', '250 Mbps', 'Play Box TV', 360, 13000.00, 15340.00);

-- Create indexes for better search performance
CREATE INDEX idx_gtpl_broadband_plans_name ON public.gtpl_broadband_plans(plan_name);
CREATE INDEX idx_gtpl_broadband_plans_speed ON public.gtpl_broadband_plans(speed);
CREATE INDEX idx_gtpl_broadband_plans_base_price ON public.gtpl_broadband_plans(base_price);
CREATE INDEX idx_gtpl_broadband_plans_validity ON public.gtpl_broadband_plans(validity_days);
