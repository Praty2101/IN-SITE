
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RechargeStats } from './recharge/RechargeStats';
import { RechargeForm } from './recharge/RechargeForm';
import { RechargeFilters } from './recharge/RechargeFilters';
import { RechargeList } from './recharge/RechargeList';
import { useRecharges } from '@/hooks/useRecharges';

export const RechargeTracker = () => {
  const { recharges, addRecharge, deleteRecharge, toggleStatus } = useRecharges();
  
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

  return (
    <Card>
      <CardHeader>
        <RechargeStats recharges={filteredRecharges} />
      </CardHeader>
      <CardContent className="space-y-4">
        <RechargeForm onAddRecharge={addRecharge} />
        
        <RechargeFilters
          searchTerm={searchTerm}
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onServiceFilterChange={setServiceFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <RechargeList
          recharges={filteredRecharges}
          onDeleteRecharge={deleteRecharge}
          onToggleStatus={toggleStatus}
        />
      </CardContent>
    </Card>
  );
};
