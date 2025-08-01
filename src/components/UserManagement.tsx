import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, Eye, MapPin, Calendar, CreditCard, Plus, Phone, Mail, Database, Users, Building2, Wifi, Tv } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AddCustomerDialog } from './AddCustomerDialog';

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
  connection_date?: string;
  last_payment?: string;
}

interface DealerStats {
  total: number;
  active: number;
  revenue: number;
  avgPackageAmount: number;
}

export const UserManagement = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedDealer, setSelectedDealer] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Dealer-specific data
  const [dealerStats, setDealerStats] = useState<Record<string, DealerStats>>({});
  const [bcCustomers, setBcCustomers] = useState<Customer[]>([]);
  const [jcCustomers, setJcCustomers] = useState<Customer[]>([]);
  const [mbCustomers, setMbCustomers] = useState<Customer[]>([]);
  const [gbCustomers, setGbCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // Fetch from all tables
      const [jcResponse, bcResponse, gbResponse, mbResponse] = await Promise.all([
        supabase.from('JC').select('*').not('NAME', 'is', null),
        supabase.from('BC').select('*').not('NAME', 'is', null),
        supabase.from('GB').select('*').not('CustomerName', 'is', null),
        supabase.from('MB').select('*').not('CustomerName', 'is', null)
      ]);

      // Process JC customers (Cable TV)
      const jcProcessed = (jcResponse.data || [])
        .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
        .map((customer: any) => ({
          id: `jc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME.trim(),
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          email: customer.EMAIL || undefined,
          service_type: 'Cable TV',
          address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
          city: customer.CITY || 'N/A',
          package_name: customer.PACKAGE_NAME || 'Standard Package',
          status: customer.STATUS === 'ACTIVE' ? 'Active' : customer.STATUS || 'Unknown',
          source_table: 'JC',
          connection_date: customer.START_DATE || undefined,
          last_payment: customer.ORDER_DATE || undefined,
          package_amount: undefined
        }));

      // Process BC customers (Cable TV)
      const bcProcessed = (bcResponse.data || [])
        .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
        .map((customer: any) => ({
          id: `bc_${customer["VC No."] || customer.CONTRACT_NUMBER || Math.random()}`,
          customer_id: customer["VC No."]?.toString() || customer.CONTRACT_NUMBER?.toString() || 'N/A',
          name: customer.NAME.trim(),
          phone: customer.MOBILE_PHONE?.toString() || 'N/A',
          email: customer.EMAIL || undefined,
          service_type: 'Cable TV',
          address: [customer.ADDRESS1, customer.ADDRESS2, customer.ADDRESS3].filter(Boolean).join(', '),
          city: customer.CITY || 'N/A',
          package_name: customer.PACKAGE_NAME || 'Standard Package',
          status: customer.STATUS === 'ACTIVE' ? 'Active' : customer.STATUS || 'Unknown',
          source_table: 'BC',
          connection_date: customer.START_DATE || undefined,
          last_payment: customer.ORDER_DATE || undefined,
          package_amount: undefined
        }));

      // Process GB customers (Broadband)
      const gbProcessed = (gbResponse.data || [])
        .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
        .map((customer: any) => ({
          id: `gb_${customer.CustomerId || Math.random()}`,
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName.trim(),
          phone: 'N/A',
          email: undefined,
          service_type: 'Broadband',
          address: 'N/A',
          city: 'N/A',
          package_name: customer.Package || 'Standard Package',
          status: 'Active',
          source_table: 'GB',
          package_amount: customer.PackageAmount || undefined
        }));

      // Process MB customers (Broadband)
      const mbProcessed = (mbResponse.data || [])
        .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
        .map((customer: any) => ({
          id: `mb_${customer.CustomerId || Math.random()}`,
          customer_id: customer.CustomerId?.toString() || 'N/A',
          name: customer.CustomerName.trim(),
          phone: 'N/A',
          email: undefined,
          service_type: 'Broadband',
          address: 'N/A',
          city: 'N/A',
          package_name: customer.Package || 'Standard Package',
          status: 'Active',
          source_table: 'MB',
          package_amount: customer.PackageAmount || undefined
        }));

      // Set dealer-specific data
      setBcCustomers(bcProcessed);
      setJcCustomers(jcProcessed);
      setGbCustomers(gbProcessed);
      setMbCustomers(mbProcessed);

      // Combine all customers
      const allCustomers = [...jcProcessed, ...bcProcessed, ...gbProcessed, ...mbProcessed];
      
      // Remove duplicates and sort
      const uniqueCustomers = allCustomers.filter((customer, index, self) => 
        index === self.findIndex((c) => c.customer_id === customer.customer_id && c.name === customer.name)
      ).sort((a, b) => a.name.localeCompare(b.name));

      setCustomers(uniqueCustomers);

      // Calculate dealer statistics
      const stats: Record<string, DealerStats> = {};
      ['BC', 'JC', 'GB', 'MB'].forEach(dealer => {
        const dealerCustomers = uniqueCustomers.filter(c => c.source_table === dealer);
        const activeCustomers = dealerCustomers.filter(c => c.status === 'Active');
        const totalRevenue = dealerCustomers.reduce((sum, c) => sum + (c.package_amount || 0), 0);
        const avgAmount = dealerCustomers.length > 0 ? totalRevenue / dealerCustomers.length : 0;

        stats[dealer] = {
          total: dealerCustomers.length,
          active: activeCustomers.length,
          revenue: totalRevenue,
          avgPackageAmount: avgAmount
        };
      });

      setDealerStats(stats);

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

  // Get customers based on selected dealer
  const getFilteredCustomers = () => {
    let baseCustomers = customers;
    
    if (selectedDealer !== 'all') {
      baseCustomers = customers.filter(c => c.source_table === selectedDealer);
    }

    return baseCustomers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (customer.phone && customer.phone !== 'N/A' && customer.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           customer.package_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter;
      const matchesService = serviceFilter === 'all' || customer.service_type.includes(serviceFilter);
      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
      
      return matchesSearch && matchesStatus && matchesService && matchesCity;
    });
  };

  const filteredCustomers = getFilteredCustomers();

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

  const getDealerColor = (dealer: string) => {
    switch (dealer) {
      case 'BC': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'JC': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'GB': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'MB': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDealerIcon = (dealer: string) => {
    switch (dealer) {
      case 'BC':
      case 'JC':
        return <Tv className="h-4 w-4" />;
      case 'GB':
      case 'MB':
        return <Wifi className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Customer ID', 'Service', 'Package', 'Phone', 'Email', 'City', 'Status', 'Dealer', 'Package Amount'].join(','),
      ...filteredCustomers.map(customer => [
        customer.name,
        customer.customer_id,
        customer.service_type,
        customer.package_name,
        customer.phone,
        customer.email || '',
        customer.city,
        customer.status,
        customer.source_table,
        customer.package_amount || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${selectedDealer !== 'all' ? selectedDealer + '-' : ''}${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredCustomers.length} customer records.`,
    });
  };

  const renderDealerOverview = () => (
    <div className="space-y-6">
      {/* Dealer Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(dealerStats).map(([dealer, stats]) => (
          <Card key={dealer} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedDealer(dealer)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${getDealerColor(dealer)}`}>
                  {getDealerIcon(dealer)}
                </div>
                <Badge variant="outline" className="text-xs">
                  {dealer === 'BC' || dealer === 'JC' ? 'Cable TV' : 'Broadband'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-medium text-green-600">{stats.active}</span>
                </div>
                {stats.avgPackageAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Amount:</span>
                    <span className="font-medium">₹{Math.round(stats.avgPackageAmount)}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3" onClick={(e) => {
                e.stopPropagation();
                setSelectedDealer(dealer);
                setActiveTab('customers');
              }}>
                View {dealer} Database
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{customers.length}</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
              <div className="text-xs text-muted-foreground mt-1">Across all databases</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {(dealerStats.BC?.total || 0) + (dealerStats.JC?.total || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Cable TV Customers</div>
              <div className="text-xs text-muted-foreground mt-1">BC + JC databases</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {(dealerStats.GB?.total || 0) + (dealerStats.MB?.total || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Broadband Customers</div>
              <div className="text-xs text-muted-foreground mt-1">GB + MB databases</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomerGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
      {filteredCustomers.map((customer) => (
        <Card key={customer.id} className="hover:shadow-md transition-shadow animate-fade-in">
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Header with name, status, and dealer */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg truncate">{customer.name}</h3>
                <div className="flex items-center gap-1">
                  <Badge variant={getStatusColor(customer.status)} className="text-xs">
                    {customer.status}
                  </Badge>
                </div>
              </div>

              {/* Customer ID and Dealer Badge */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  ID: {customer.customer_id}
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${getDealerColor(customer.source_table)}`}>
                  {getDealerIcon(customer.source_table)}
                  {customer.source_table}
                </div>
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

              {/* Dates */}
              {(customer.connection_date || customer.last_payment) && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  {customer.connection_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Connected: {new Date(customer.connection_date).toLocaleDateString()}
                    </div>
                  )}
                  {customer.last_payment && (
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      Last Payment: {new Date(customer.last_payment).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}

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
  );

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
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Customer Database ({customers.length} Total)
          </CardTitle>
          <div className="flex items-center gap-2">
            <AddCustomerDialog onCustomerAdded={fetchCustomers} />
            <Button variant="outline" size="sm" onClick={exportCustomers}>
              <Download className="h-4 w-4 mr-2" />
              Export {selectedDealer !== 'all' ? selectedDealer : 'All'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Dealer Overview
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customer Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {renderDealerOverview()}
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            {/* Enhanced Filters with Dealer Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, address, phone, email, or package..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Dealer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dealers</SelectItem>
                  <SelectItem value="BC">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      BC Database
                    </div>
                  </SelectItem>
                  <SelectItem value="JC">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      JC Database
                    </div>
                  </SelectItem>
                  <SelectItem value="GB">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      GB Database
                    </div>
                  </SelectItem>
                  <SelectItem value="MB">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      MB Database
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
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
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="TV">Cable TV</SelectItem>
                  <SelectItem value="Broadband">Broadband</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[120px]">
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

            {/* Current Selection Summary */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Showing:</span>
                  <span className="font-medium ml-1">{filteredCustomers.length} customers</span>
                  {selectedDealer !== 'all' && (
                    <span className="text-muted-foreground ml-2">from {selectedDealer} database</span>
                  )}
                </div>
                {selectedDealer !== 'all' && dealerStats[selectedDealer] && (
                  <Badge variant="outline" className="text-xs">
                    {dealerStats[selectedDealer].active} Active
                  </Badge>
                )}
              </div>
              {selectedDealer !== 'all' && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedDealer('all')}>
                  View All Dealers
                </Button>
              )}
            </div>

            {/* Customer Grid */}
            {renderCustomerGrid()}
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground animate-fade-in">
                <div className="text-lg font-medium">No customers found</div>
                <div className="text-sm">
                  {selectedDealer !== 'all' 
                    ? `No customers in ${selectedDealer} database match your criteria.`
                    : 'Try adjusting your search criteria or dealer selection.'
                  }
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};