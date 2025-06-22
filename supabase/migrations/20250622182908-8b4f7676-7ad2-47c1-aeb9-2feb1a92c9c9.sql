
-- Create GTPL Cable TV packs table
CREATE TABLE public.gtpl_tv_packs (
  id SERIAL PRIMARY KEY,
  pack_name TEXT NOT NULL,
  channel_count INTEGER NOT NULL DEFAULT 100, -- Default channel count since not provided
  operator_price DECIMAL(10,2) NOT NULL, -- Price without GST (operator pays)
  customer_price DECIMAL(10,2) NOT NULL, -- Price with GST (customer pays)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for demo purposes)
ALTER TABLE public.gtpl_tv_packs ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Public access to GTPL TV packs" 
  ON public.gtpl_tv_packs 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gtpl_tv_packs_updated_at
    BEFORE UPDATE ON public.gtpl_tv_packs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all GTPL Cable TV pack data
INSERT INTO public.gtpl_tv_packs (pack_name, channel_count, operator_price, customer_price) VALUES
('PLATINUM HD', 150, 409.18, 499.00),
('GOLD', 140, 328.00, 400.00),
('ODIA POWER PLUS', 130, 303.40, 370.00),
('TELUGU FAMILY PACK', 125, 287.00, 350.00),
('FUSION ODIYA TELUGU', 125, 287.00, 350.00),
('DIAMOND HD', 120, 278.80, 340.00),
('POWER PLUS', 115, 262.40, 320.00),
('POWER PLUS HINDI', 115, 262.40, 320.00),
('ODIA POWER LITE', 110, 237.80, 290.00),
('POWER', 105, 217.30, 265.00),
('ODIA STARTER', 100, 188.60, 230.00),
('BENGALI PRIME', 95, 184.50, 225.00),
('HINDI PRIME', 95, 184.50, 225.00),
('ODIYA LITE', 90, 159.90, 195.00),
('GTPL KCBPL FTA PACK', 80, 125.79, 153.40);

-- Create indexes for better search performance
CREATE INDEX idx_gtpl_tv_packs_name ON public.gtpl_tv_packs(pack_name);
CREATE INDEX idx_gtpl_tv_packs_customer_price ON public.gtpl_tv_packs(customer_price);
CREATE INDEX idx_gtpl_tv_packs_operator_price ON public.gtpl_tv_packs(operator_price);
