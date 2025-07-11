
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
  const { toast } = useToast();
  const [recharges, setRecharges] = useState<Recharge[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecharges = recharges.filter(recharge => {
    const matchesSearch = recharge.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recharge.pack.toLowerCase().includes(searchTerm.toLowerCase());
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
    setRecharges(recharges.map(r => 
      r.id === id 
        ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' as 'completed' | 'pending' | 'failed' }
        : r
    ));
  };

  // Calculate stats - use customer price for total amount calculation
  const totalAmount = filteredRecharges.reduce((sum, r) => sum + (r.customerPrice || r.amount), 0);
  const completedCount = filteredRecharges.filter(r => r.status === 'completed').length;
  const successRate = filteredRecharges.length > 0 ? Math.round((completedCount / filteredRecharges.length) * 100) : 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex-1">
            <CardTitle className="text-base sm:text-lg text-left">Daily Recharge & Renewal Tracking</CardTitle>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-muted-foreground">Total (Customer)</div>
                <div className="text-sm sm:text-base font-bold">₹{totalAmount.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm text-muted-foreground">Count</div>
                <div className="text-sm sm:text-base font-bold">{filteredRecharges.length}</div>
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
                <div className="text-sm sm:text-base font-bold text-green-600">{successRate}%</div>
              </div>
            </div>
          </div>
          <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto sm:mx-0" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <RechargeForm onAddRecharge={handleAddRecharge} />
        <RechargeFilters 
          searchTerm={searchTerm}
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onServiceFilterChange={setServiceFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <div className="max-h-60 sm:max-h-64 overflow-y-auto">
          <RechargeList 
            recharges={filteredRecharges}
            onDeleteRecharge={handleDeleteRecharge}
            onToggleStatus={toggleStatus}
          />
        </div>
      </CardContent>
    </Card>
  );
};
