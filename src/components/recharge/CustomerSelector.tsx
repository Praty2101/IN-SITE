
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
        const [jcData, bcData] = await Promise.all([
          supabase.from('JC').select('*'),
          supabase.from('BC').select('*')
        ]);

        const jcCustomers = (jcData.data || []).map((customer: any) => ({
          id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || Math.random().toString(),
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME || 'Unknown',
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          service_type: 'Cable TV (JC)'
        }));

        const bcCustomers = (bcData.data || []).map((customer: any) => ({
          id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || Math.random().toString(),
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME || 'Unknown',
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          service_type: 'Cable TV (BC)'
        }));

        data = [...jcCustomers, ...bcCustomers].filter(c => c.name !== 'Unknown');

      } else if (serviceType === 'Internet') {
        // Fetch from GB and MB tables for Broadband
        const [gbData, mbData] = await Promise.all([
          supabase.from('GB').select('*'),
          supabase.from('MB').select('*')
        ]);

        const gbCustomers = (gbData.data || []).map((customer: any) => ({
          id: customer.CustomerId?.toString() || Math.random().toString(),
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName || 'Unknown',
          phone: 'N/A',
          service_type: 'Broadband (GB)'
        }));

        const mbCustomers = (mbData.data || []).map((customer: any) => ({
          id: customer.CustomerId?.toString() || Math.random().toString(),
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName || 'Unknown',
          phone: 'N/A',
          service_type: 'Broadband (MB)'
        }));

        data = [...gbCustomers, ...mbCustomers].filter(c => c.name !== 'Unknown');
      }

      setCustomers(data);
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
    customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        {customer.customer_id} • {customer.phone} • {customer.service_type}
                      </span>
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
        <div className="text-sm text-muted-foreground">
          Selected: {selectedCustomerName}
        </div>
      )}
    </div>
  );
};
