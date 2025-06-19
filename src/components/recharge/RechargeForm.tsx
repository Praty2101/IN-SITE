
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Pack } from '@/data/packData';
import { CompanySelector } from './CompanySelector';
import { PackSelector } from './PackSelector';
import { SelectedPackDisplay } from './SelectedPackDisplay';

interface Recharge {
  id: number;
  customer: string;
  service: string;
  pack: string;
  amount: number;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface RechargeFormProps {
  onAddRecharge: (recharge: Omit<Recharge, 'id' | 'time' | 'date' | 'status'>) => void;
}

export const RechargeForm: React.FC<RechargeFormProps> = ({ onAddRecharge }) => {
  const { toast } = useToast();
  const [newRecharge, setNewRecharge] = useState({
    customer: '',
    service: '',
    company: '',
    selectedPack: null as Pack | null,
    pack: '',
    amount: 0
  });

  const handleAddRecharge = () => {
    if (!newRecharge.customer || !newRecharge.service || !newRecharge.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    let amount = 0;
    let packName = '';
    
    if (newRecharge.company === 'SITI' && newRecharge.service === 'TV' && newRecharge.selectedPack) {
      amount = newRecharge.selectedPack.customerPrice ?? newRecharge.selectedPack.operatorPrice;
      packName = newRecharge.selectedPack.label;
    } else {
      amount = Number(newRecharge.amount) || 0;
      packName = newRecharge.pack || 'Standard';
    }

    onAddRecharge({
      customer: newRecharge.customer,
      service: newRecharge.service,
      pack: packName,
      amount
    });

    setNewRecharge({ 
      customer: '', 
      service: '', 
      company: '', 
      selectedPack: null, 
      pack: '', 
      amount: 0 
    });
    
    toast({
      title: "Recharge Added",
      description: `Successfully recorded recharge for ${newRecharge.customer}`,
    });
  };

  const handleServiceChange = (value: string) => {
    setNewRecharge({ 
      ...newRecharge, 
      service: value, 
      company: '', 
      selectedPack: null, 
      pack: '', 
      amount: 0 
    });
  };

  const handleCompanyChange = (value: string) => {
    setNewRecharge({ 
      ...newRecharge, 
      company: value, 
      selectedPack: null, 
      pack: '', 
      amount: 0 
    });
  };

  const handlePackChange = (selectedPack: Pack | null) => {
    setNewRecharge({
      ...newRecharge,
      selectedPack: selectedPack,
      amount: selectedPack ? (selectedPack.customerPrice ?? selectedPack.operatorPrice) : 0
    });
  };

  const handlePackNameChange = (name: string) => {
    setNewRecharge({ ...newRecharge, pack: name });
  };

  const shouldShowAmountInput = !(newRecharge.company === 'SITI' && newRecharge.service === 'TV' && newRecharge.selectedPack);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Input
          placeholder="Customer Name"
          value={newRecharge.customer}
          onChange={(e) => setNewRecharge({ ...newRecharge, customer: e.target.value })}
        />
        
        <Select value={newRecharge.service} onValueChange={handleServiceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TV">Cable TV</SelectItem>
            <SelectItem value="Internet">Broadband</SelectItem>
          </SelectContent>
        </Select>
        
        <CompanySelector
          service={newRecharge.service}
          company={newRecharge.company}
          onCompanyChange={handleCompanyChange}
        />
        
        <PackSelector
          service={newRecharge.service}
          company={newRecharge.company}
          selectedPack={newRecharge.selectedPack}
          packName={newRecharge.pack}
          onPackChange={handlePackChange}
          onPackNameChange={handlePackNameChange}
        />
        
        {shouldShowAmountInput && (
          <Input
            placeholder="Amount"
            type="number"
            value={newRecharge.amount || ''}
            onChange={(e) => setNewRecharge({ ...newRecharge, amount: Number(e.target.value) })}
          />
        )}

        <SelectedPackDisplay
          service={newRecharge.service}
          company={newRecharge.company}
          selectedPack={newRecharge.selectedPack}
        />
      </div>
      
      <Button onClick={handleAddRecharge} className="w-full">
        Add Recharge
      </Button>
    </div>
  );
};
