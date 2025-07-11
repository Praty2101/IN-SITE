
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp } from 'lucide-react';
import { RechargeForm } from './recharge/RechargeForm';
import { RechargeFilters } from './recharge/RechargeFilters';
import { RechargeList } from './recharge/RechargeList';
import { supabase } from '@/integrations/supabase/client';

interface Recharge {
  id: string | number;
  customer: string;
  service: string;
  pack: string;
  amount: number;
  customerPrice?: number;
  operatorPrice?: number;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  customerId?: string;
  serviceType?: string;
  company?: string;
}

export const RechargeTracker = () => {
  const { toast } = useToast();
  const [recharges, setRecharges] = useState<Recharge[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRecharges();
  }, []);

  const fetchRecharges = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recharges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform database records to component format
      const transformedRecharges = (data || []).map((record: any) => ({
        id: record.id,
        customer: record.customer_name,
        service: record.service_type,
        pack: record.pack_name,
        amount: record.customer_price,
        customerPrice: record.customer_price,
        operatorPrice: record.operator_price,
        time: new Date(`1970-01-01T${record.transaction_time}`).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        date: record.transaction_date,
        status: record.status
      }));

      setRecharges(transformedRecharges);
    } catch (error) {
      console.error('Error fetching recharges:', error);
      toast({
        title: "Error",
        description: "Failed to load recharge data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRecharges = recharges.filter(recharge => {
    const matchesSearch = recharge.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recharge.pack.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === 'all' || recharge.service === serviceFilter;
    const matchesStatus = statusFilter === 'all' || recharge.status === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  const handleAddRecharge = async (newRechargeData: Omit<Recharge, 'id' | 'time' | 'date' | 'status'>) => {
    try {
      // First, save to database
      const { data, error } = await supabase
        .from('recharges')
        .insert({
          customer_name: newRechargeData.customer,
          customer_source_id: newRechargeData.customerId || 'manual_entry',
          customer_source_table: 'manual',
          service_type: newRechargeData.service,
          company: newRechargeData.company || 'Unknown',
          pack_name: newRechargeData.pack,
          customer_price: newRechargeData.customerPrice || newRechargeData.amount,
          operator_price: newRechargeData.operatorPrice,
          status: 'completed'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Refresh the list
      await fetchRecharges();

      toast({
        title: "Recharge Added",
        description: `Successfully recorded recharge for ${newRechargeData.customer} - ₹${newRechargeData.customerPrice || newRechargeData.amount}`,
      });
    } catch (error) {
      console.error('Error adding recharge:', error);
      toast({
        title: "Error",
        description: "Failed to save recharge",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRecharge = async (id: string | number) => {
    try {
      const { error } = await supabase
        .from('recharges')
        .delete()
        .eq('id', id.toString());

      if (error) {
        throw error;
      }

      // Refresh the list
      await fetchRecharges();

      toast({
        title: "Recharge Deleted",
        description: "Recharge record has been removed"
      });
    } catch (error) {
      console.error('Error deleting recharge:', error);
      toast({
        title: "Error",
        description: "Failed to delete recharge",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (id: string | number) => {
    try {
      const currentRecharge = recharges.find(r => r.id === id);
      if (!currentRecharge) return;

      const newStatus = currentRecharge.status === 'completed' ? 'pending' : 'completed';

      const { error } = await supabase
        .from('recharges')
        .update({ status: newStatus })
        .eq('id', id.toString());

      if (error) {
        throw error;
      }

      // Refresh the list
      await fetchRecharges();
    } catch (error) {
      console.error('Error updating recharge status:', error);
      toast({
        title: "Error",
        description: "Failed to update recharge status",
        variant: "destructive"
      });
    }
  };

  // Calculate stats - use customer price for total amount calculation
  const totalAmount = filteredRecharges.reduce((sum, r) => sum + (r.customerPrice || r.amount), 0);
  const completedCount = filteredRecharges.filter(r => r.status === 'completed').length;
  const successRate = filteredRecharges.length > 0 ? Math.round((completedCount / filteredRecharges.length) * 100) : 0;

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center">Loading recharge data...</div>
        </CardContent>
      </Card>
    );
  }

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
