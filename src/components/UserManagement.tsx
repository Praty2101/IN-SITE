import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Eye, MapPin, Calendar, CreditCard } from 'lucide-react';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      address: '123 Main St, City A', 
      ispId: 'ISP001', 
      service: 'TV + Internet', 
      amount: 1299, 
      status: 'Active',
      lastPayment: '2024-06-10',
      nextDue: '2024-07-10',
      totalPaid: 15588,
      connectionDate: '2023-01-15',
      planDetails: 'Premium Sports + 100 Mbps'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      address: '456 Oak Ave, City B', 
      ispId: 'ISP002', 
      service: 'Internet', 
      amount: 899, 
      status: 'Active',
      lastPayment: '2024-06-08',
      nextDue: '2024-07-08',
      totalPaid: 10788,
      connectionDate: '2023-03-22',
      planDetails: '200 Mbps Unlimited'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      address: '789 Pine Rd, City C', 
      ispId: 'ISP003', 
      service: 'TV', 
      amount: 499, 
      status: 'Pending',
      lastPayment: '2024-05-15',
      nextDue: '2024-06-15',
      totalPaid: 5988,
      connectionDate: '2023-06-10',
      planDetails: 'Basic Entertainment'
    },
    { 
      id: 4, 
      name: 'Alice Brown', 
      address: '321 Elm St, City A', 
      ispId: 'ISP004', 
      service: 'TV + Internet', 
      amount: 1499, 
      status: 'Active',
      lastPayment: '2024-06-12',
      nextDue: '2024-07-12',
      totalPaid: 17988,
      connectionDate: '2022-11-05',
      planDetails: 'Premium All + 300 Mbps'
    },
    { 
      id: 5, 
      name: 'Bob Wilson', 
      address: '654 Maple Dr, City B', 
      ispId: 'ISP005', 
      service: 'Internet', 
      amount: 799, 
      status: 'Active',
      lastPayment: '2024-06-09',
      nextDue: '2024-07-09',
      totalPaid: 9588,
      connectionDate: '2023-02-18',
      planDetails: '150 Mbps Business'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.ispId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesService = serviceFilter === 'all' || user.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalRevenue = filteredUsers.reduce((sum, user) => sum + user.totalPaid, 0);
  const averageRevenue = totalRevenue / filteredUsers.length || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customer Database Analytics</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Customers</div>
            <div className="text-xl font-bold">{filteredUsers.length}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-xl font-bold">₹{totalRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Avg Revenue/Customer</div>
            <div className="text-xl font-bold">₹{Math.round(averageRevenue).toLocaleString()}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Active Rate</div>
            <div className="text-xl font-bold text-green-600">
              {Math.round((filteredUsers.filter(u => u.status === 'Active').length / filteredUsers.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ISP ID, or address..."
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Customer Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">{user.name}</div>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {user.address}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">ID:</span> {user.ispId}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Plan:</span> {user.planDetails}
                  </div>
                </div>

                {/* Service & Financial Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{user.service}</Badge>
                    <span className="font-medium">₹{user.amount}/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Total Paid: ₹{user.totalPaid.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Customer since: {new Date(user.connectionDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Last Payment:</span> {new Date(user.lastPayment).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next Due:</span> {new Date(user.nextDue).toLocaleDateString()}
                  </div>
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
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
