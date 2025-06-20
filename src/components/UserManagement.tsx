
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
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  service_type: string;
  plan_name: string;
  plan_details: string;
  monthly_amount: number;
  connection_date: string;
  status: string;
  last_payment_date: string;
  next_due_date: string;
  total_paid: number;
  notes: string;
}

export const UserManagement = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCustomers(data || []);
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
                         customer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter;
    const matchesService = serviceFilter === 'all' || customer.service_type === serviceFilter;
    const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
    
    return matchesSearch && matchesStatus && matchesService && matchesCity;
  });

  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + (customer.total_paid || 0), 0);
  const averageRevenue = totalRevenue / filteredCustomers.length || 0;
  const monthlyRevenue = filteredCustomers.reduce((sum, customer) => sum + customer.monthly_amount, 0);

  // Get unique cities for filter
  const uniqueCities = [...new Set(customers.map(c => c.city))].filter(Boolean).sort();

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
    switch (service) {
      case 'TV': return 'outline';
      case 'Internet': return 'secondary';
      case 'TV + Internet': return 'default';
      default: return 'outline';
    }
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
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Customers</div>
            <div className="text-xl font-bold">{filteredCustomers.length}</div>
            <div className="text-xs text-muted-foreground">of {customers.length}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">All time</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            <div className="text-xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Avg Revenue/Customer</div>
            <div className="text-xl font-bold">₹{Math.round(averageRevenue).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Lifetime</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Active Rate</div>
            <div className="text-xl font-bold text-green-600">
              {Math.round((filteredCustomers.filter(c => c.status === 'Active').length / filteredCustomers.length) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {filteredCustomers.filter(c => c.status === 'Active').length} active
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, address, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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
              <SelectItem value="TV">TV Only</SelectItem>
              <SelectItem value="Internet">Internet Only</SelectItem>
              <SelectItem value="TV + Internet">TV + Internet</SelectItem>
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
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Customer Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">{customer.name}</div>
                    <Badge variant={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {customer.address}, {customer.city}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">ID:</span> {customer.customer_id}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {customer.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    )}
                    {customer.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Service & Financial Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getServiceColor(customer.service_type)}>
                      {customer.service_type}
                    </Badge>
                    <span className="font-medium">₹{customer.monthly_amount}/month</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Plan:</span> {customer.plan_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.plan_details}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Total Paid: ₹{customer.total_paid?.toLocaleString() || '0'}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Since: {new Date(customer.connection_date).toLocaleDateString()}
                  </div>
                  {customer.last_payment_date && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Payment:</span> {new Date(customer.last_payment_date).toLocaleDateString()}
                    </div>
                  )}
                  {customer.next_due_date && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next Due:</span> {new Date(customer.next_due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
