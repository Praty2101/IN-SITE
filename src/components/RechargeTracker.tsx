
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const RechargeTracker = () => {
  const { toast } = useToast();
  const [recharges, setRecharges] = useState([
    { id: 1, customer: 'John Doe', service: 'TV', pack: 'Premium Sports', amount: 599, time: '09:30 AM' },
    { id: 2, customer: 'Jane Smith', service: 'Internet', pack: '100 Mbps', amount: 899, time: '10:15 AM' },
    { id: 3, customer: 'Mike Johnson', service: 'TV', pack: 'Basic Package', amount: 299, time: '11:00 AM' }
  ]);

  const [newRecharge, setNewRecharge] = useState({
    customer: '',
    service: '',
    pack: '',
    amount: ''
  });

  const handleAddRecharge = () => {
    if (!newRecharge.customer || !newRecharge.service || !newRecharge.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const recharge = {
      id: recharges.length + 1,
      customer: newRecharge.customer,
      service: newRecharge.service,
      pack: newRecharge.pack || 'Standard',
      amount: parseInt(newRecharge.amount),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setRecharges([recharge, ...recharges]);
    setNewRecharge({ customer: '', service: '', pack: '', amount: '' });
    
    toast({
      title: "Recharge Added",
      description: `Successfully recorded recharge for ${newRecharge.customer}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Recharge Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            placeholder="Customer Name"
            value={newRecharge.customer}
            onChange={(e) => setNewRecharge({ ...newRecharge, customer: e.target.value })}
          />
          <Select value={newRecharge.service} onValueChange={(value) => setNewRecharge({ ...newRecharge, service: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TV">Cable TV</SelectItem>
              <SelectItem value="Internet">Broadband</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Pack/Plan Name"
            value={newRecharge.pack}
            onChange={(e) => setNewRecharge({ ...newRecharge, pack: e.target.value })}
          />
          <Input
            placeholder="Amount (₹)"
            type="number"
            value={newRecharge.amount}
            onChange={(e) => setNewRecharge({ ...newRecharge, amount: e.target.value })}
          />
        </div>
        <Button onClick={handleAddRecharge} className="w-full">
          Add Recharge
        </Button>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recharges.map((recharge) => (
            <div key={recharge.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{recharge.customer}</div>
                <div className="text-sm text-muted-foreground">
                  {recharge.pack} • {recharge.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={recharge.service === 'TV' ? 'default' : 'secondary'}>
                  {recharge.service}
                </Badge>
                <span className="font-bold">₹{recharge.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
