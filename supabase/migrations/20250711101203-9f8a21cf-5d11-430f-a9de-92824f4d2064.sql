-- Create recharges table to track all transactions
CREATE TABLE public.recharges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_source_id TEXT NOT NULL, -- ID from JC/BC/GB/MB tables
  customer_source_table TEXT NOT NULL, -- JC, BC, GB, or MB
  service_type TEXT NOT NULL, -- TV or Internet
  company TEXT NOT NULL, -- SITI, GTPL, etc.
  pack_name TEXT NOT NULL,
  customer_price NUMERIC NOT NULL,
  operator_price NUMERIC,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  transaction_time TIME NOT NULL DEFAULT CURRENT_TIME,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.recharges ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is implemented)
CREATE POLICY "Public access to recharges" 
ON public.recharges 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_recharges_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_recharges_updated_at
BEFORE UPDATE ON public.recharges
FOR EACH ROW
EXECUTE FUNCTION public.update_recharges_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_recharges_date ON public.recharges (transaction_date DESC);
CREATE INDEX idx_recharges_customer ON public.recharges (customer_name);
CREATE INDEX idx_recharges_source ON public.recharges (customer_source_table, customer_source_id);