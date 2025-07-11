
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  customer_id: string;
  name: string;
  phone: string;
  service_type: string;
  address?: string;
  city?: string;
  package_name?: string;
}

interface CustomerSelectorProps {
  selectedCustomerId: string;
  selectedCustomerName: string;
  onCustomerChange: (customerId: string, customerName: string) => void;
  serviceType: string;
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  selectedCustomerId,
  selectedCustomerName,
  onCustomerChange,
  serviceType
}) => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(selectedCustomerName);

  useEffect(() => {
    if (serviceType) {
      fetchCustomers();
    }
  }, [serviceType]);

  useEffect(() => {
    setInputValue(selectedCustomerName);
  }, [selectedCustomerName]);

  const fetchCustomers = async () => {
    if (!serviceType) return;

    try {
      setLoading(true);
      let data: any[] = [];

      if (serviceType === 'TV') {
        // Fetch from JC and BC tables for Cable TV
        const [jcResponse, bcResponse] = await Promise.all([
          supabase.from('JC').select('*').not('NAME', 'is', null),
          supabase.from('BC').select('*').not('NAME', 'is', null)
        ]);

        if (jcResponse.error) console.error('JC fetch error:', jcResponse.error);
        if (bcResponse.error) console.error('BC fetch error:', bcResponse.error);

        const jcCustomers = (jcResponse.data || [])
          .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
          .map((customer: any) => ({
            id: `jc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
            customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
            name: customer.NAME.trim(),
            phone: customer.MOBILE_PHONE?.toString() || 'N/A',
            service_type: 'Cable TV (JC)',
            address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
            city: customer.CITY || 'N/A',
            package_name: customer.PACKAGE_NAME || 'N/A'
          }));

        const bcCustomers = (bcResponse.data || [])
          .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
          .map((customer: any) => ({
            id: `bc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
            customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
            name: customer.NAME.trim(),
            phone: customer.MOBILE_PHONE?.toString() || 'N/A',
            service_type: 'Cable TV (BC)',
            address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
            city: customer.CITY || 'N/A',
            package_name: customer.PACKAGE_NAME || 'N/A'
          }));

        data = [...jcCustomers, ...bcCustomers];

      } else if (serviceType === 'Internet') {
        // Fetch from GB and MB tables for Broadband
        const [gbResponse, mbResponse] = await Promise.all([
          supabase.from('GB').select('*').not('CustomerName', 'is', null),
          supabase.from('MB').select('*').not('CustomerName', 'is', null)
        ]);

        if (gbResponse.error) console.error('GB fetch error:', gbResponse.error);
        if (mbResponse.error) console.error('MB fetch error:', mbResponse.error);

        const gbCustomers = (gbResponse.data || [])
          .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
          .map((customer: any) => ({
            id: `gb_${customer.CustomerId || Math.random()}`,
            customer_id: customer.CustomerId?.toString() || 'N/A',
            name: customer.CustomerName.trim(),
            phone: 'N/A',
            service_type: 'Broadband (GB)',
            address: 'N/A',
            city: 'N/A',
            package_name: customer.Package || 'N/A'
          }));

        const mbCustomers = (mbResponse.data || [])
          .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
          .map((customer: any) => ({
            id: `mb_${customer.CustomerId || Math.random()}`,
            customer_id: customer.CustomerId?.toString() || 'N/A',
            name: customer.CustomerName.trim(),
            phone: 'N/A',
            service_type: 'Broadband (MB)',
            address: 'N/A',
            city: 'N/A',
            package_name: customer.Package || 'N/A'
          }));

        data = [...gbCustomers, ...mbCustomers];
      }

      // Remove duplicates and sort by name
      const uniqueCustomers = data.filter((customer, index, self) => 
        index === self.findIndex((c) => c.customer_id === customer.customer_id && c.name === customer.name)
      ).sort((a, b) => a.name.localeCompare(b.name));

      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone !== 'N/A' && customer.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.package_name && customer.package_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    
    // Clear selection if input doesn't match selected customer
    if (value !== selectedCustomerName) {
      onCustomerChange('', '');
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setInputValue(customer.name);
    setSearchTerm('');
    setShowSuggestions(false);
    onCustomerChange(customer.id, customer.name);
  };

  const handleInputFocus = () => {
    if (inputValue.length > 0) {
      setSearchTerm(inputValue);
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click selection
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative space-y-2">
      <Input
        placeholder={serviceType ? "Type customer name to search..." : "Select service type first"}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={loading || !serviceType}
        className="w-full"
      />

      {showSuggestions && filteredCustomers.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <Command>
            <CommandList>
              <CommandGroup>
                {filteredCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    onSelect={() => handleCustomerSelect(customer)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCustomerId === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {customer.customer_id} • {customer.phone !== 'N/A' ? customer.phone : 'No phone'} • {customer.service_type}
                      </span>
                      {customer.package_name && customer.package_name !== 'N/A' && (
                        <span className="text-xs text-muted-foreground">
                          Package: {customer.package_name}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {filteredCustomers.length === 0 && (
                <CommandEmpty>
                  {loading ? "Loading customers..." : "No customers found"}
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}

      {selectedCustomerName && (
        <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-2">
          <div className="font-medium">Selected: {selectedCustomerName}</div>
          {customers.find(c => c.name === selectedCustomerName) && (
            <div className="text-xs mt-1">
              ID: {customers.find(c => c.name === selectedCustomerName)?.customer_id} • 
              {customers.find(c => c.name === selectedCustomerName)?.service_type}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
