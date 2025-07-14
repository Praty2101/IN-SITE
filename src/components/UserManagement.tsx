import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Eye, MapPin, Calendar, CreditCard, Plus, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  customer_id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  service_type: string;
  package_name: string;
  status: string;
  source_table: string;
  package_amount?: number;
}

export const UserManagement = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [dealerFilter, setDealerFilter] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      let allCustomers: Customer[] = [];

      // Fetch from JC and BC tables for Cable TV
      const [jcResponse, bcResponse, gbResponse, mbResponse] = await Promise.all([
        supabase.from('JC').select('*').not('NAME', 'is', null),
        supabase.from('BC').select('*').not('NAME', 'is', null),
        supabase.from('GB').select('*').not('CustomerName', 'is', null),
        supabase.from('MB').select('*').not('CustomerName', 'is', null)
      ]);

      // Process JC customers
      const jcCustomers = (jcResponse.data || [])
        .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
        .map((customer: any) => ({
          id: `jc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME.trim(),
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          email: customer.EMAIL || undefined,
          service_type: 'Cable TV (JC)',
          address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
          city: customer.CITY || 'N/A',
          package_name: customer.PACKAGE_NAME || 'Standard Package',
          status: customer.STATUS === 'ACTIVE' ? 'Active' : customer.STATUS || 'Unknown',
          source_table: 'JC'
        }));

      // Process BC customers
      const bcCustomers = (bcResponse.data || [])
        .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
        .map((customer: any) => ({
          id: `bc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME.trim(),
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          email: customer.EMAIL || undefined,
          service_type: 'Cable TV (BC)',
          address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
          city: customer.CITY || 'N/A',
          package_name: customer.PACKAGE_NAME || 'Standard Package',
          status: customer.STATUS === 'ACTIVE' ? 'Active' : customer.STATUS || 'Unknown',
          source_table: 'BC'
        }));

      // Process GB customers
      const gbCustomers = (gbResponse.data || [])
        .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
        .map((customer: any) => ({
          id: `gb_${customer.CustomerId || Math.random()}`,
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName.trim(),
          phone: 'N/A',
          email: undefined,
          service_type: 'Broadband (GB)',
          address: 'N/A',
          city: 'N/A',
          package_name: customer.Package || 'Standard Package',
          status: 'Active',
          source_table: 'GB',
          package_amount: customer.PackageAmount || undefined
        }));

      // Process MB customers
      const mbCustomers = (mbResponse.data || [])
        .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
        .map((customer: any) => ({
          id: `mb_${customer.CustomerId || Math.random()}`,
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName.trim(),
          phone: 'N/A',
          email: undefined,
          service_type: 'Broadband (MB)',
          address: 'N/A',
          city: 'N/A',
          package_name: customer.Package || 'Standard Package',
          status: 'Active',
          source_table: 'MB',
          package_amount: customer.PackageAmount || undefined
        }));

      allCustomers = [...jcCustomers, ...bcCustomers, ...gbCustomers, ...mbCustomers];

      // Remove duplicates and sort by name
      const uniqueCustomers = allCustomers.filter((customer, index, self) => 
        index === self.findIndex((c) => c.customer_id === customer.customer_id && c.name === customer.name)
      ).sort((a, b) => a.name.localeCompare(b.name));

      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.phone && customer.phone !== 'N/A' && customer.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         customer.package_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter;
    const matchesService = serviceFilter === 'all' || customer.service_type.includes(serviceFilter);
    const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
    const matchesDealer = dealerFilter === 'all' || customer.source_table === dealerFilter;
    
    return matchesSearch && matchesStatus && matchesService && matchesCity && matchesDealer;
  });

  const totalCustomers = filteredCustomers.length;
  const activeCustomers = filteredCustomers.filter(c => c.status === 'Active').length;
  const cableTvCustomers = filteredCustomers.filter(c => c.service_type.includes('TV')).length;
  const broadbandCustomers = filteredCustomers.filter(c => c.service_type.includes('Broadband')).length;

  // Get unique cities for filter (excluding 'N/A')
  const uniqueCities = [...new Set(customers.map(c => c.city))].filter(city => city && city !== 'N/A').sort();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'suspended': return 'destructive';
      case 'cancelled': return 'outline';
      default: return 'secondary';
    }
  };

  const getServiceColor = (service: string) => {
    if (service.includes('TV')) return 'outline';
    if (service.includes('Broadband')) return 'secondary';
    return 'default';
  };

  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Customer ID', 'Service', 'Package', 'Phone', 'Email', 'City', 'Status', 'Source'].join(','),
      ...filteredCustomers.map(customer => [
        customer.name,
        customer.customer_id,
        customer.service_type,
        customer.package_name,
        customer.phone,
        customer.email || '',
        customer.city,
        customer.status,
        customer.source_table
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredCustomers.length} customer records.`,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading customer database...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customer Database ({customers.length} Total)</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline" size="sm" onClick={exportCustomers}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Customers</div>
            <div className="text-xl font-bold">{totalCustomers}</div>
            <div className="text-xs text-muted-foreground">of {customers.length} total</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Active Customers</div>
            <div className="text-xl font-bold text-green-600">{activeCustomers}</div>
            <div className="text-xs text-muted-foreground">
              {totalCustomers > 0 ? Math.round((activeCustomers / totalCustomers) * 100) : 0}% active rate
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Cable TV</div>
            <div className="text-xl font-bold text-blue-600">{cableTvCustomers}</div>
            <div className="text-xs text-muted-foreground">JC + BC customers</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Broadband</div>
            <div className="text-xl font-bold text-purple-600">{broadbandCustomers}</div>
            <div className="text-xs text-muted-foreground">GB + MB customers</div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, address, phone, email, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={dealerFilter} onValueChange={setDealerFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Dealer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dealers</SelectItem>
              <SelectItem value="BC">BC Database</SelectItem>
              <SelectItem value="JC">JC Database</SelectItem>
              <SelectItem value="GB">GB Database</SelectItem>
              <SelectItem value="MB">MB Database</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="TV">Cable TV</SelectItem>
              <SelectItem value="Broadband">Broadband</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {uniqueCities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow animate-fade-in">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header with name and status */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg truncate">{customer.name}</h3>
                    <Badge variant={getStatusColor(customer.status)} className="text-xs">
                      {customer.status}
                    </Badge>
                  </div>

                  {/* Customer ID and Source */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      ID: {customer.customer_id}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {customer.source_table}
                    </Badge>
                  </div>

                  {/* Service Type */}
                  <div className="flex items-center gap-2">
                    <Badge variant={getServiceColor(customer.service_type)} className="text-xs">
                      {customer.service_type}
                    </Badge>
                  </div>

                  {/* Package Information */}
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Package:</span> {customer.package_name}
                    </div>
                    {customer.package_amount && (
                      <div className="text-sm font-medium text-green-600">
                        ₹{customer.package_amount}
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-1">
                    {customer.phone && customer.phone !== 'N/A' && (
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                    {customer.email && (
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-1 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-xs leading-relaxed">
                      {customer.address !== 'N/A' ? `${customer.address}, ${customer.city}` : customer.city}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full hover-scale">
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <div className="text-lg font-medium">No customers found</div>
            <div className="text-sm">Try adjusting your search criteria or dealer selection.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};