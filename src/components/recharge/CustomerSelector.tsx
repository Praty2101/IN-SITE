
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

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
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  selectedCustomerId,
  selectedCustomerName,
  onCustomerChange
}) => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('id, customer_id, name, phone, service_type')
        .eq('status', 'Active')
        .order('name');

      if (error) {
        throw error;
      }

      setCustomers(data || []);
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

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      onCustomerChange(customerId, customer.name);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Select
          value={selectedCustomerId}
          onValueChange={handleCustomerSelect}
          disabled={loading}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder={loading ? "Loading customers..." : "Select Customer"} />
          </SelectTrigger>
          <SelectContent>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {customer.customer_id} • {customer.phone} • {customer.service_type}
                    </span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-customers" disabled>
                {loading ? "Loading..." : "No customers found"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        
        <button
          type="button"
          onClick={() => setShowSearch(!showSearch)}
          className="px-3 py-2 border rounded-md hover:bg-muted transition-colors"
          title="Search customers"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {showSearch && (
        <Input
          placeholder="Search by name, ID, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      )}

      {selectedCustomerName && (
        <div className="text-sm text-muted-foreground">
          Selected: {selectedCustomerName}
        </div>
      )}
    </div>
  );
};
