import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PackComboBox } from '@/components/PackComboBox';
import { useSitiPacks } from '@/hooks/useSitiPacks';
import type { NewRecharge } from '@/types/recharge';

interface RechargeFormProps {
  onAddRecharge: (newRecharge: NewRecharge, calculatedAmount: number) => boolean;
}

export const RechargeForm: React.FC<RechargeFormProps> = ({ onAddRecharge }) => {
  const { data: sitiPacks = [], isLoading: packsLoading, error: packsError } = useSitiPacks();
  
  const [newRecharge, setNewRecharge] = useState<NewRecharge>({
    customer: '',
    service: '',
    company: '',
    pack: '',
    amount: 0
  });

  const tvCompanies = [
    { value: "SITI", label: "SITI" },
    { value: "GTPL", label: "GTPL" }
  ];
  const internetCompanies = [
    { value: "Alliance", label: "Alliance" },
    { value: "GTPL", label: "GTPL" }
  ];

  const selectedSitiPack = newRecharge.company === 'SITI' && newRecharge.service === 'TV'
    ? sitiPacks.find(p => p.pack_name === newRecharge.pack)
    : null;

  const handleAddRecharge = () => {
    let amount = 0;
    if (newRecharge.company === 'SITI' && newRecharge.service === 'TV') {
      const packObj = sitiPacks.find(p => p.pack_name === newRecharge.pack);
      amount = packObj?.actual_price ?? packObj?.deductible_amount ?? 0;
    } else {
      amount = Number(newRecharge.amount) || 0;
    }

    const success = onAddRecharge(newRecharge, amount);
    if (success) {
      setNewRecharge({ customer: '', service: '', company: '', pack: '', amount: 0 });
    }
  };

  if (packsError) {
    console.error('Error loading SITI packs:', packsError);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Input
          placeholder="Customer Name"
          value={newRecharge.customer}
          onChange={(e) => setNewRecharge({ ...newRecharge, customer: e.target.value })}
        />
        <Select
          value={newRecharge.service}
          onValueChange={(value) => setNewRecharge({ ...newRecharge, service: value, company: '', pack: '', amount: 0 })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TV">Cable TV</SelectItem>
            <SelectItem value="Internet">Broadband</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={newRecharge.company}
          onValueChange={(value) => setNewRecharge({ ...newRecharge, company: value, pack: '', amount: 0 })}
          disabled={!newRecharge.service}
        >
          <SelectTrigger>
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            {newRecharge.service === "TV" &&
              tvCompanies.map(company => (
                <SelectItem key={company.value} value={company.value}>{company.label}</SelectItem>
              ))}
            {newRecharge.service === "Internet" &&
              internetCompanies.map(company => (
                <SelectItem key={company.value} value={company.value}>{company.label}</SelectItem>
              ))}
          </SelectContent>
        </Select>
        
        {newRecharge.service === "TV" && newRecharge.company === "SITI" ? (
          <div>
            {packsLoading ? (
              <Input placeholder="Loading packs..." disabled />
            ) : (
              <PackComboBox
                packs={sitiPacks}
                value={newRecharge.pack}
                onChange={(selectedValue) => {
                  const packObj = sitiPacks.find(p => p.pack_name === selectedValue);
                  setNewRecharge({
                    ...newRecharge,
                    pack: selectedValue,
                    amount: packObj?.actual_price ?? packObj?.deductible_amount ?? 0
                  });
                }}
                onSelectPack={packObj => {
                  setNewRecharge({
                    ...newRecharge,
                    pack: packObj.pack_name || '',
                    amount: packObj.actual_price ?? packObj.deductible_amount ?? 0
                  });
                }}
                placeholder="Search or choose pack..."
              />
            )}
          </div>
        ) : (
          <Input
            placeholder="Pack/Plan Name"
            type="text"
            value={newRecharge.pack}
            onChange={(e) => setNewRecharge({ ...newRecharge, pack: e.target.value })}
          />
        )}
        
        {(newRecharge.company !== 'SITI' || newRecharge.service !== 'TV') && (
          <Input
            placeholder="Amount"
            type="number"
            min={0}
            value={newRecharge.amount}
            onChange={e => setNewRecharge({ ...newRecharge, amount: +e.target.value })}
          />
        )}
        
        {(newRecharge.company === 'SITI' && newRecharge.service === 'TV' && selectedSitiPack) && (
          <div className="flex gap-2">
            <Input
              placeholder="Customer Amount"
              type="number"
              value={selectedSitiPack.actual_price ?? selectedSitiPack.deductible_amount ?? 0}
              readOnly
              className="bg-gray-100"
            />
            {selectedSitiPack.actual_price && selectedSitiPack.deductible_amount && (
              <Input
                placeholder="Operator Deduction"
                type="number"
                value={selectedSitiPack.deductible_amount}
                readOnly
                className="bg-gray-100"
              />
            )}
          </div>
        )}
      </div>
      <Button onClick={handleAddRecharge} className="w-full">
        Add Recharge
      </Button>
    </div>
  );
};