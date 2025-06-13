
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: 1, name: 'John Doe', address: '123 Main St, City A', ispId: 'ISP001', service: 'TV + Internet', amount: 1299, status: 'Active' },
    { id: 2, name: 'Jane Smith', address: '456 Oak Ave, City B', ispId: 'ISP002', service: 'Internet', amount: 899, status: 'Active' },
    { id: 3, name: 'Mike Johnson', address: '789 Pine Rd, City C', ispId: 'ISP003', service: 'TV', amount: 499, status: 'Pending' },
    { id: 4, name: 'Alice Brown', address: '321 Elm St, City A', ispId: 'ISP004', service: 'TV + Internet', amount: 1499, status: 'Active' },
    { id: 5, name: 'Bob Wilson', address: '654 Maple Dr, City B', ispId: 'ISP005', service: 'Internet', amount: 799, status: 'Active' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ispId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Database</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ISP ID, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">ID: {user.ispId}</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {user.address}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{user.service}</Badge>
                <span className="font-medium">₹{user.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
