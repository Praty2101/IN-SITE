
-- Create a comprehensive customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id TEXT UNIQUE NOT NULL, -- ISP ID like ISP001, ISP002, etc.
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT DEFAULT 'Your State',
  pincode TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('TV', 'Internet', 'TV + Internet')),
  plan_name TEXT NOT NULL,
  plan_details TEXT,
  monthly_amount DECIMAL(10,2) NOT NULL,
  connection_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Pending', 'Suspended', 'Cancelled')),
  last_payment_date DATE,
  next_due_date DATE,
  total_paid DECIMAL(12,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_customers_customer_id ON public.customers(customer_id);
CREATE INDEX idx_customers_name ON public.customers(name);
CREATE INDEX idx_customers_service_type ON public.customers(service_type);
CREATE INDEX idx_customers_status ON public.customers(status);
CREATE INDEX idx_customers_city ON public.customers(city);

-- Enable Row Level Security (public access for demo purposes)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (adjust based on your needs)
CREATE POLICY "Public access to customers" 
  ON public.customers 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing (50 sample customers with properly escaped quotes)
INSERT INTO public.customers (customer_id, name, phone, email, address, city, service_type, plan_name, plan_details, monthly_amount, connection_date, last_payment_date, next_due_date, total_paid) VALUES
('ISP001', 'Rajesh Kumar', '+91-9876543211', 'rajesh.kumar@email.com', '123 MG Road, Sector 1', 'Mumbai', 'TV + Internet', 'Premium Sports + 100 Mbps', 'All Sports Channels + 100 Mbps Internet', 1299.00, '2023-01-15', '2024-06-10', '2024-07-10', 15588.00),
('ISP002', 'Priya Sharma', '+91-9876543212', 'priya.sharma@email.com', '456 Park Street, Block A', 'Delhi', 'Internet', '200 Mbps Unlimited', 'High-speed broadband', 899.00, '2023-03-22', '2024-06-08', '2024-07-08', 10788.00),
('ISP003', 'Amit Patel', '+91-9876543213', 'amit.patel@email.com', '789 Lake View, Apartment 5B', 'Ahmedabad', 'TV', 'Basic Entertainment', 'Popular Hindi Channels', 499.00, '2023-06-10', '2024-05-15', '2024-06-15', 5988.00),
('ISP004', 'Sunita Reddy', '+91-9876543214', 'sunita.reddy@email.com', '321 Tech Park, Tower 2', 'Bangalore', 'TV + Internet', 'Premium All + 300 Mbps', 'Premium channels + Ultra-fast internet', 1499.00, '2022-11-05', '2024-06-12', '2024-07-12', 17988.00),
('ISP005', 'Vikram Singh', '+91-9876543215', 'vikram.singh@email.com', '654 Mall Road, Shop 12', 'Chandigarh', 'Internet', '150 Mbps Business', 'Business broadband package', 799.00, '2023-02-18', '2024-06-09', '2024-07-09', 9588.00),
('ISP006', 'Meera Joshi', '+91-9876543216', 'meera.joshi@email.com', '987 Colony Road, House 23', 'Pune', 'TV', 'Family Pack', 'Family entertainment channels', 699.00, '2023-04-12', '2024-06-01', '2024-07-01', 8388.00),
('ISP007', 'Ravi Gupta', '+91-9876543217', 'ravi.gupta@email.com', '147 Garden Lane, Villa 8', 'Jaipur', 'TV + Internet', 'Standard Plus', 'Basic channels + 50 Mbps', 999.00, '2023-05-20', '2024-06-15', '2024-07-15', 11988.00),
('ISP008', 'Kavita Nair', '+91-9876543218', 'kavita.nair@email.com', '258 Beach Road, Flat 4A', 'Chennai', 'Internet', '100 Mbps Home', 'Home broadband', 649.00, '2023-07-08', '2024-06-05', '2024-07-05', 7788.00),
('ISP009', 'Suresh Agarwal', '+91-9876543219', 'suresh.agarwal@email.com', '369 Market Street, Office 15', 'Kolkata', 'TV', 'Sports Special', 'All sports channels', 899.00, '2023-01-30', '2024-06-20', '2024-07-20', 10788.00),
('ISP010', 'Anita Das', '+91-9876543220', 'anita.das@email.com', '741 River View, Apartment 7C', 'Hyderabad', 'TV + Internet', 'Entertainment Plus', 'Entertainment + 75 Mbps', 1199.00, '2023-08-14', '2024-06-18', '2024-07-18', 14388.00),
('ISP011', 'Manoj Yadav', '+91-9876543221', 'manoj.yadav@email.com', '852 Hill Station, Bungalow 3', 'Shimla', 'Internet', '50 Mbps Basic', 'Basic internet plan', 499.00, '2023-09-25', '2024-06-12', '2024-07-12', 5988.00),
('ISP012', 'Deepa Kulkarni', '+91-9876543222', 'deepa.kulkarni@email.com', '963 Valley Road, House 19', 'Nashik', 'TV', 'Regional Pack', 'Regional language channels', 399.00, '2023-10-10', '2024-06-08', '2024-07-08', 4788.00),
('ISP013', 'Rohit Malhotra', '+91-9876543223', 'rohit.malhotra@email.com', '159 City Center, Suite 201', 'Gurgaon', 'TV + Internet', 'Business Premium', 'Business channels + 500 Mbps', 1899.00, '2022-12-20', '2024-06-22', '2024-07-22', 22788.00),
('ISP014', 'Shalini Kapoor', '+91-9876543224', 'shalini.kapoor@email.com', '357 Green Park, Flat 6B', 'Noida', 'Internet', '1 Gbps Ultra', 'Ultra-high speed internet', 2499.00, '2023-03-15', '2024-06-10', '2024-07-10', 29988.00),
('ISP015', 'Arjun Tiwari', '+91-9876543225', 'arjun.tiwari@email.com', '468 Temple Street, Room 12', 'Varanasi', 'TV', 'Devotional Pack', 'Religious and devotional channels', 299.00, '2023-11-18', '2024-06-05', '2024-07-05', 3588.00),
('ISP016', 'Pooja Bansal', '+91-9876543226', 'pooja.bansal@email.com', '579 Shopping Complex, Floor 3', 'Ludhiana', 'TV + Internet', 'Home Complete', 'Complete home entertainment', 1399.00, '2023-04-28', '2024-06-14', '2024-07-14', 16788.00),
('ISP017', 'Kiran Mehta', '+91-9876543227', 'kiran.mehta@email.com', '680 Industrial Area, Unit 45', 'Surat', 'Internet', '200 Mbps Pro', 'Professional internet', 999.00, '2023-06-05', '2024-06-20', '2024-07-20', 11988.00),
('ISP018', 'Ajay Verma', '+91-9876543228', 'ajay.verma@email.com', '791 Railway Station Road', 'Agra', 'TV', 'Movie Mania', 'All movie channels', 799.00, '2023-07-22', '2024-06-16', '2024-07-16', 9588.00),
('ISP019', 'Rekha Saxena', '+91-9876543229', 'rekha.saxena@email.com', '802 University Campus, Hostel B', 'Allahabad', 'Internet', '25 Mbps Student', 'Student internet plan', 299.00, '2023-08-30', '2024-06-12', '2024-07-12', 3588.00),
('ISP020', 'Naveen Kumar', '+91-9876543230', 'naveen.kumar@email.com', '913 IT Park, Block C', 'Kochi', 'TV + Internet', 'Tech Pro', 'Technology channels + 250 Mbps', 1599.00, '2023-02-14', '2024-06-18', '2024-07-18', 19188.00),
('ISP021', 'Geeta Rao', '+91-9876543231', 'geeta.rao@email.com', '024 Airport Road, Terminal 1', 'Goa', 'TV', 'International Pack', 'International channels', 1299.00, '2023-05-07', '2024-06-25', '2024-07-25', 15588.00),
('ISP022', 'Harish Chandra', '+91-9876543232', 'harish.chandra@email.com', '135 Fort Area, Heritage Building', 'Jodhpur', 'Internet', '75 Mbps Standard', 'Standard broadband', 599.00, '2023-09-12', '2024-06-08', '2024-07-08', 7188.00),
('ISP023', 'Lakshmi Iyer', '+91-9876543233', 'lakshmi.iyer@email.com', '246 Beach Resort, Cottage 7', 'Pondicherry', 'TV + Internet', 'Coastal Special', 'Tourism package', 1099.00, '2023-10-25', '2024-06-15', '2024-07-15', 13188.00),
('ISP024', 'Dinesh Jain', '+91-9876543234', 'dinesh.jain@email.com', '357 Diamond Market, Shop 89', 'Mumbai', 'TV', 'Business News', 'Business and news channels', 699.00, '2023-01-08', '2024-06-22', '2024-07-22', 8388.00),
('ISP025', 'Usha Pandey', '+91-9876543235', 'usha.pandey@email.com', '468 Medical College, Quarter 12', 'Lucknow', 'Internet', '40 Mbps Economy', 'Economic internet plan', 399.00, '2023-12-03', '2024-06-10', '2024-07-10', 4788.00),
('ISP026', 'Ramesh Pillai', '+91-9876543236', 'ramesh.pillai@email.com', '579 Spice Garden, Villa 15', 'Calicut', 'TV + Internet', 'Spice Special', 'Regional + 100 Mbps', 999.00, '2023-03-18', '2024-06-28', '2024-07-28', 11988.00),
('ISP027', 'Nisha Agrawal', '+91-9876543237', 'nisha.agrawal@email.com', '680 Textile Hub, Factory 23', 'Coimbatore', 'TV', 'Tamil Super', 'Tamil entertainment', 599.00, '2023-06-12', '2024-06-05', '2024-07-05', 7188.00),
('ISP028', 'Praveen Reddy', '+91-9876543238', 'praveen.reddy@email.com', '791 Tech City, Tower A', 'Hyderabad', 'Internet', '500 Mbps Corporate', 'Corporate internet', 1799.00, '2022-11-28', '2024-06-20', '2024-07-20', 21588.00),
('ISP029', 'Shanti Devi', '+91-9876543239', 'shanti.devi@email.com', '802 Handicraft Center, Workshop 5', 'Jaipur', 'TV', 'Rajasthani Culture', 'Rajasthani channels', 399.00, '2023-07-15', '2024-06-12', '2024-07-12', 4788.00),
('ISP030', 'Yogesh Sharma', '+91-9876543240', 'yogesh.sharma@email.com', '913 Sports Complex, Block D', 'Chandigarh', 'TV + Internet', 'Sports Arena', 'All sports + 150 Mbps', 1299.00, '2023-04-05', '2024-06-18', '2024-07-18', 15588.00),
('ISP031', 'Madhuri Desai', '+91-9876543241', 'madhuri.desai@email.com', '024 Film City, Studio 12', 'Mumbai', 'TV', 'Bollywood Blast', 'Hindi movie channels', 899.00, '2023-08-20', '2024-06-25', '2024-07-25', 10788.00),
('ISP032', 'Santosh Kumar', '+91-9876543242', 'santosh.kumar@email.com', '135 Agriculture College', 'Bhopal', 'Internet', '30 Mbps Rural', 'Rural internet scheme', 349.00, '2023-11-10', '2024-06-08', '2024-07-08', 4188.00),
('ISP033', 'Priyanka Gupta', '+91-9876543243', 'priyanka.gupta@email.com', '246 Fashion Street, Boutique 8', 'Delhi', 'TV + Internet', 'Fashion Forward', 'Lifestyle + 200 Mbps', 1199.00, '2023-02-25', '2024-06-15', '2024-07-15', 14388.00),
('ISP034', 'Vinod Yadav', '+91-9876543244', 'vinod.yadav@email.com', '357 Government Colony', 'Patna', 'TV', 'Bihar Special', 'Bhojpuri and Hindi', 499.00, '2023-05-18', '2024-06-22', '2024-07-22', 5988.00),
('ISP035', 'Swati Mishra', '+91-9876543245', 'swati.mishra@email.com', '468 University Town, Hostel C', 'Pune', 'Internet', '60 Mbps Student Plus', 'Enhanced student plan', 449.00, '2023-09-02', '2024-06-10', '2024-07-10', 5388.00),
('ISP036', 'Ashok Singhal', '+91-9876543246', 'ashok.singhal@email.com', '579 Industrial Estate, Unit 67', 'Kanpur', 'TV + Internet', 'Industrial Pro', 'Business + 100 Mbps', 1099.00, '2023-12-15', '2024-06-28', '2024-07-28', 13188.00),
('ISP037', 'Manisha Joshi', '+91-9876543247', 'manisha.joshi@email.com', '680 Hill Station Resort', 'Mussoorie', 'TV', 'Mountain View', 'Travel and nature', 699.00, '2023-03-08', '2024-06-05', '2024-07-05', 8388.00),
('ISP038', 'Rakesh Tiwari', '+91-9876543248', 'rakesh.tiwari@email.com', '791 Banking District, Tower B', 'Mumbai', 'Internet', '1 Gbps Finance', 'Financial sector internet', 2999.00, '2022-10-12', '2024-06-20', '2024-07-20', 35988.00),
('ISP039', 'Seema Agarwal', '+91-9876543249', 'seema.agarwal@email.com', '802 Medical Hub, Clinic 15', 'Chennai', 'TV', 'Health Plus', 'Health and wellness', 599.00, '2023-06-30', '2024-06-12', '2024-07-12', 7188.00),
('ISP040', 'Nitin Saxena', '+91-9876543250', 'nitin.saxena@email.com', '913 Software Park, Building 8', 'Bangalore', 'TV + Internet', 'Developer Pro', 'Tech channels + 400 Mbps', 1699.00, '2023-01-22', '2024-06-18', '2024-07-18', 20388.00),
('ISP041', 'Archana Devi', '+91-9876543251', 'archana.devi@email.com', '024 Cultural Center, Hall 3', 'Kolkata', 'TV', 'Bengali Culture', 'Bengali entertainment', 549.00, '2023-07-05', '2024-06-25', '2024-07-25', 6588.00),
('ISP042', 'Sunil Rajput', '+91-9876543252', 'sunil.rajput@email.com', '135 Defense Colony, House 42', 'Delhi', 'Internet', '80 Mbps Defense', 'Defense personnel plan', 599.00, '2023-10-18', '2024-06-08', '2024-07-08', 7188.00),
('ISP043', 'Vandana Sharma', '+91-9876543253', 'vandana.sharma@email.com', '246 Shopping Mall, Level 2', 'Gurgaon', 'TV + Internet', 'Mall Connect', 'Retail + 120 Mbps', 1249.00, '2023-04-15', '2024-06-15', '2024-07-15', 14988.00),
('ISP044', 'Anil Pathak', '+91-9876543254', 'anil.pathak@email.com', '357 Railway Quarters, Block 7', 'Allahabad', 'TV', 'Railway Special', 'Travel and news', 449.00, '2023-08-08', '2024-06-22', '2024-07-22', 5388.00),
('ISP045', 'Kalpana Singh', '+91-9876543255', 'kalpana.singh@email.com', '468 Womens College, Hostel A', 'Jaipur', 'Internet', '35 Mbps Women', 'Women-friendly plan', 399.00, '2023-11-25', '2024-06-10', '2024-07-10', 4788.00),
('ISP046', 'Mohan Lal', '+91-9876543256', 'mohan.lal@email.com', '579 Senior Citizen Complex', 'Chandigarh', 'TV + Internet', 'Senior Care', 'Senior citizen package', 799.00, '2023-02-10', '2024-06-28', '2024-07-28', 9588.00),
('ISP047', 'Sushma Gupta', '+91-9876543257', 'sushma.gupta@email.com', '680 Nursery School, Block C', 'Noida', 'TV', 'Kids Zone', 'Children entertainment', 649.00, '2023-05-28', '2024-06-05', '2024-07-05', 7788.00),
('ISP048', 'Raj Kumar', '+91-9876543258', 'raj.kumar@email.com', '791 Adventure Sports Center', 'Rishikesh', 'Internet', '90 Mbps Adventure', 'Adventure tourism plan', 749.00, '2023-09-14', '2024-06-20', '2024-07-20', 8988.00),
('ISP049', 'Neelam Verma', '+91-9876543259', 'neelam.verma@email.com', '802 Art Gallery, Studio 20', 'Mumbai', 'TV', 'Art & Culture', 'Arts and culture channels', 699.00, '2023-12-01', '2024-06-12', '2024-07-12', 8388.00),
('ISP050', 'Govind Prasad', '+91-9876543260', 'govind.prasad@email.com', '913 Eco Park, Green Villa 5', 'Pune', 'TV + Internet', 'Eco Friendly', 'Green living + 80 Mbps', 999.00, '2023-03-20', '2024-06-18', '2024-07-18', 11988.00);
