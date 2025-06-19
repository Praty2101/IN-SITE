import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';
import { RechargeForm } from './recharge/RechargeForm';
import { RechargeFilters } from './recharge/RechargeFilters';
import { RechargeList } from './recharge/RechargeList';
interface Recharge {
  id: number;
  customer: string;
  service: string;
  pack: string;
  amount: number;
  customerPrice?: number;
  operatorPrice?: number;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
export const RechargeTracker = () => {
  const {
    toast
  } = useToast();
  const [recharges, setRecharges] = useState<Recharge[]>([{
    id: 1,
    customer: 'John Doe',
    service: 'TV',
    pack: 'Premium Sports',
    amount: 599,
    customerPrice: 599,
    operatorPrice: 508,
    time: '09:30 AM',
    date: '2024-06-13',
    status: 'completed'
  }, {
    id: 2,
    customer: 'Jane Smith',
    service: 'Internet',
    pack: '100 Mbps',
    amount: 899,
    customerPrice: 899,
    operatorPrice: 899,
    time: '10:15 AM',
    date: '2024-06-13',
    status: 'completed'
  }, {
    id: 3,
    customer: 'Mike Johnson',
    service: 'TV',
    pack: 'Basic Package',
    amount: 299,
    customerPrice: 299,
    operatorPrice: 254,
    time: '11:00 AM',
    date: '2024-06-13',
    status: 'pending'
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredRecharges = recharges.filter(recharge => {
    const matchesSearch = recharge.customer.toLowerCase().includes(searchTerm.toLowerCase()) || recharge.pack.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === 'all' || recharge.service === serviceFilter;
    const matchesStatus = statusFilter === 'all' || recharge.status === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });
  const handleAddRecharge = (newRechargeData: Omit<Recharge, 'id' | 'time' | 'date' | 'status'>) => {
    const recharge: Recharge = {
      id: Date.now(),
      ...newRechargeData,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setRecharges([recharge, ...recharges]);
  };
  const handleDeleteRecharge = (id: number) => {
    setRecharges(recharges.filter(r => r.id !== id));
    toast({
      title: "Recharge Deleted",
      description: "Recharge record has been removed"
    });
  };
  const toggleStatus = (id: number) => {
    setRecharges(recharges.map(r => r.id === id ? {
      ...r,
      status: r.status === 'completed' ? 'pending' : 'completed' as 'completed' | 'pending' | 'failed'
    } : r));
  };

  // Calculate stats - use customer price for total amount calculation
  const totalAmount = filteredRecharges.reduce((sum, r) => sum + (r.customerPrice || r.amount), 0);
  const completedCount = filteredRecharges.filter(r => r.status === 'completed').length;
  const successRate = filteredRecharges.length > 0 ? Math.round(completedCount / filteredRecharges.length * 100) : 0;
  return <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-left">Daily Recharge &amp; Renewal Tracking</CardTitle>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Total (Customer)</div>
                <div className="font-bold">₹{totalAmount.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Count</div>
                <div className="font-bold">{filteredRecharges.length}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="font-bold text-green-600">{successRate}%</div>
              </div>
            </div>
          </div>
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <RechargeForm onAddRecharge={handleAddRecharge} />
        <RechargeFilters searchTerm={searchTerm} serviceFilter={serviceFilter} statusFilter={statusFilter} onSearchChange={setSearchTerm} onServiceFilterChange={setServiceFilter} onStatusFilterChange={setStatusFilter} />
        <RechargeList recharges={filteredRecharges} onDeleteRecharge={handleDeleteRecharge} onToggleStatus={toggleStatus} />
      </CardContent>
    </Card>;
};