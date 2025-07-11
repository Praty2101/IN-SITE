-- Insert sample data into JC table (Cable TV customers)
INSERT INTO public."JC" (
  "NAME", "VC No.", "CONTRACT_NUMBER", "MOBILE_PHONE", "EMAIL", 
  "ADDRESS1", "ADDRESS2", "CITY", "STATE", "PACKAGE_NAME", "STATUS"
) VALUES 
('Rajesh Kumar', 12001, 10001, 9876543210, 'rajesh@email.com', 
 'House No 123', 'Sector 15', 'Kolkata', 'West Bengal', 'Premium HD Package', 'ACTIVE'),
('Priya Singh', 12002, 10002, 9876543211, 'priya@email.com', 
 'Flat 4B', 'Park Street', 'Kolkata', 'West Bengal', 'Gold Package', 'ACTIVE'),
('Amit Ghosh', 12003, 10003, 9876543212, 'amit@email.com', 
 'Plot 567', 'Salt Lake', 'Kolkata', 'West Bengal', 'Basic Package', 'ACTIVE');

-- Insert sample data into BC table (Cable TV customers)
INSERT INTO public."BC" (
  "NAME", "VC No.", "CONTRACT_NUMBER", "MOBILE_PHONE", "EMAIL", 
  "ADDRESS1", "ADDRESS2", "CITY", "STATE", "PACKAGE_NAME", "STATUS"
) VALUES 
('Sunita Das', 13001, 11001, 9876543213, 'sunita@email.com', 
 'House 89', 'New Town', 'Kolkata', 'West Bengal', 'Family Package', 'ACTIVE'),
('Ravi Sharma', 13002, 11002, 9876543214, 'ravi@email.com', 
 'Apartment 2C', 'Ballygunge', 'Kolkata', 'West Bengal', 'Sports Package', 'ACTIVE'),
('Meera Jain', 13003, 11003, 9876543215, 'meera@email.com', 
 'Villa 12', 'Alipore', 'Kolkata', 'West Bengal', 'Premium Sports', 'ACTIVE');

-- Insert sample data into GB table (Broadband customers)
INSERT INTO public."GB" (
  "CustomerId", "CustomerName", "Package", "PackageAmount"
) VALUES 
(20001, 'Suresh Patel', '100 Mbps Unlimited', 899),
(20002, 'Kavita Banerjee', '50 Mbps Home Plan', 599),
(20003, 'Ankit Roy', '200 Mbps Business', 1299);

-- Insert sample data into MB table (Broadband customers)
INSERT INTO public."MB" (
  "CustomerId", "CustomerName", "Package", "PackageAmount"
) VALUES 
(21001, 'Deepak Mishra', '80 Mbps Family', 799),
(21002, 'Sanjana Gupta', '150 Mbps Premium', 999),
(21003, 'Vikram Singh', '300 Mbps Ultra', 1599);