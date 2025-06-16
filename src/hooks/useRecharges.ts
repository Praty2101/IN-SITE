
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Recharge, NewRecharge } from '@/types/recharge';

const initialRecharges: Recharge[] = [
  { id: 1, customer: 'John Doe', service: 'TV', pack: 'Premium Sports', amount: 599, time: '09:30 AM', date: '2024-06-13', status: 'completed' },
  { id: 2, customer: 'Jane Smith', service: 'Internet', pack: '100 Mbps', amount: 899, time: '10:15 AM', date: '2024-06-13', status: 'completed' },
  { id: 3, customer: 'Mike Johnson', service: 'TV', pack: 'Basic Package', amount: 299, time: '11:00 AM', date: '2024-06-13', status: 'pending' }
];

export const useRecharges = () => {
  const { toast } = useToast();
  const [recharges, setRecharges] = useState<Recharge[]>(initialRecharges);

  const addRecharge = (newRecharge: NewRecharge, calculatedAmount: number) => {
    if (!newRecharge.customer || !newRecharge.service || !newRecharge.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    const recharge: Recharge = {
      id: Date.now(),
      customer: newRecharge.customer,
      service: newRecharge.service,
      pack: newRecharge.pack || 'Standard',
      amount: calculatedAmount,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setRecharges([recharge, ...recharges]);
    
    toast({
      title: "Recharge Added",
      description: `Successfully recorded recharge for ${newRecharge.customer}`,
    });
    
    return true;
  };

  const deleteRecharge = (id: number) => {
    setRecharges(recharges.filter(r => r.id !== id));
    toast({
      title: "Recharge Deleted",
      description: "Recharge record has been removed",
    });
  };

  const toggleStatus = (id: number) => {
    setRecharges(recharges.map(r => 
      r.id === id 
        ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' as 'completed' | 'pending' | 'failed' }
        : r
    ));
  };

  return {
    recharges,
    addRecharge,
    deleteRecharge,
    toggleStatus
  };
};
