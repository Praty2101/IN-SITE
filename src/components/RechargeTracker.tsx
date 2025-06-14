import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Search, Filter, TrendingUp } from 'lucide-react';

// SITI Cable TV packs (add only once, includes all the options you pasted)
const SITI_PACKS = [
  { label: "SITI FAMILY PACK-250", value: "SITI FAMILY PACK-250", channelCount: 111, price: 211.86 },
  { label: "SFP BENGALI HINDI 320", value: "SFP BENGALI HINDI 320", channelCount: 141, price: 271.19 },
  { label: "SFP BENGALI HINDI 380", value: "SFP BENGALI HINDI 380", channelCount: 146, price: 322.03 },
  { label: "SFP BENGALI HINDI 450", value: "SFP BENGALI HINDI 450", channelCount: 157, price: 381.36 },
  { label: "SITI FAMILY PACK-490", value: "SITI FAMILY PACK-490", channelCount: 148, price: 415.25 },
  { label: "SFP BENGALI HINDI HD 600", value: "SFP BENGALI HINDI HD 600", channelCount: 171, price: 508.48 },
  { label: "SFP BENGALI HINDI 320", value: "SFP BENGALI HINDI 320", channelCount: 154, price: 271.19 },
  { label: "SFP BENGALI HINDI 380", value: "SFP BENGALI HINDI 380", channelCount: 159, price: 322.03 },
  { label: "SFP BENGALI HINDI 450", value: "SFP BENGALI HINDI 450", channelCount: 170, price: 381.36 },
  { label: "SITI FAMILY PACK-490", value: "SITI FAMILY PACK-490", channelCount: 161, price: 415.25 },
  { label: "SFP BENGALI HINDI HD 600", value: "SFP BENGALI HINDI HD 600", channelCount: 184, price: 508.48 },
  { label: "SFP TELUGU-350", value: "SFP TELUGU-350", channelCount: 138, price: 296.61 },
  { label: "SFP TELUGU-350", value: "SFP TELUGU-350", channelCount: 124, price: 296.61 },
  { label: "SITI FAMILY PACK-250", value: "SITI FAMILY PACK-250", channelCount: 123, price: 211.86 },
  { label: "SFP BENGALI HINDI HD 350", value: "SFP BENGALI HINDI HD 350", channelCount: 116, price: 296.61 },
  { label: "SITI-FAMILY HD -410", value: "SITI-FAMILY HD -410", channelCount: 129, price: 347.46 },
  { label: "SITI-FAMILY HD-410", value: "SITI-FAMILY HD-410", channelCount: 117, price: 347.46 },
  { label: "SITI FAMILY PACK ORIYA - 225", value: "SITI FAMILY PACK ORIYA - 225", channelCount: 110, price: 190.68 },
  { label: "SITI-FAMILY HINDI 475", value: "SITI-FAMILY HINDI 475", channelCount: 159, price: 402.54 },
  { label: "SITI FAMILY PACK ORIYA - 205", value: "SITI FAMILY PACK ORIYA - 205", channelCount: 70, price: 173.73 },
  { label: "SFP HINDI - 250", value: "SFP HINDI - 250", channelCount: 77, price: 211.86 },
  { label: "SFP BENGALI HINDI HD 500", value: "SFP BENGALI HINDI HD 500", channelCount: 130, price: 423.73 },
  { label: "SFP BENGALI 220", value: "SFP BENGALI 220", channelCount: 70, price: 186.44 },
  { label: "SFP BENGALI 220", value: "SFP BENGALI 220", channelCount: 60, price: 186.44 },
  { label: "SFP BENGALI HINDI HD 500", value: "SFP BENGALI HINDI HD 500", channelCount: 143, price: 423.73 },
  { label: "SITI FAMILY PACK ORIYA - 205", value: "SITI FAMILY PACK ORIYA - 205", channelCount: 76, price: 173.73 },
  { label: "SITI FAMILY PACK ORIYA - 225", value: "SITI FAMILY PACK ORIYA - 225", channelCount: 79, price: 190.68 },
  { label: "SITI-FAMILY HINDI 380", value: "SITI-FAMILY HINDI 380", channelCount: 103, price: 322.03 },
  { label: "SITI-FAMILY HINDI 410", value: "SITI-FAMILY HINDI 410", channelCount: 143, price: 347.46 },
  { label: "SFP ORIYA 360", value: "SFP ORIYA 360", channelCount: 110, price: 305.08 },
  { label: "SFP ORIYA 270", value: "SFP ORIYA 270", channelCount: 87, price: 228.81 },
  { label: "SFP ORIYA HD 500", value: "SFP ORIYA HD 500", channelCount: 141, price: 423.73 },
  { label: "SITI-FAMILY HINDI 380", value: "SITI-FAMILY HINDI 380", channelCount: 113, price: 322.03 },
  { label: "SITI-FAMILY HINDI 410", value: "SITI-FAMILY HINDI 410", channelCount: 118, price: 347.46 },
  { label: "SFP ORIYA 360", value: "SFP ORIYA 360", channelCount: 118, price: 305.08 },
  { label: "SITI-FAMILY HINDI 320", value: "SITI-FAMILY HINDI 320", channelCount: 89, price: 271.19 },
  { label: "SFP BENGALI 220", value: "SFP BENGALI 220", channelCount: 70, price: 186.44 },
  { label: "SITI-FAMILY HINDI 320", value: "SITI-FAMILY HINDI 320", channelCount: 83, price: 271.19 },
  { label: "SITI FAMILY PACK HINDI HD - 300", value: "SITI FAMILY PACK HINDI HD - 300", channelCount: 64, price: 254.24 },
  { label: "SFP BENGALI-240", value: "SFP BENGALI-240", channelCount: 76, price: 203.39 },
  { label: "SITI-FAMILY HINDI HD 630", value: "SITI-FAMILY HINDI HD 630", channelCount: 127, price: 533.90 },
  { label: "SFP BENGALI-240", value: "SFP BENGALI-240", channelCount: 66, price: 203.39 },
  { label: "SITI-FAMILY HINDI HD 630A", value: "SITI-FAMILY HINDI HD 630A", channelCount: 116, price: 533.90 },
  { label: "SITI-FAMILY HINDI HD 630", value: "SITI-FAMILY HINDI HD 630", channelCount: 117, price: 533.90 },
  { label: "SFP ORIYA 270", value: "SFP ORIYA 270", channelCount: 95, price: 228.81 },
  { label: "SFP ORIYA HD 500", value: "SFP ORIYA HD 500", channelCount: 149, price: 423.73 },
  { label: "SITI FAMILY PACK HINDI HD - 300", value: "SITI FAMILY PACK HINDI HD - 300", channelCount: 75, price: 254.24 },
];

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

export const RechargeTracker = () => {
  const { toast } = useToast();
  const [recharges, setRecharges] = useState<{
    id: number,
    customer: string,
    service: string,
    pack: string,
    amount: number,
    time: string,
    date: string,
    status: 'completed' | 'pending' | 'failed'
  }[]>([
    { id: 1, customer: 'John Doe', service: 'TV', pack: 'Premium Sports', amount: 599, time: '09:30 AM', date: '2024-06-13', status: 'completed' },
    { id: 2, customer: 'Jane Smith', service: 'Internet', pack: '100 Mbps', amount: 899, time: '10:15 AM', date: '2024-06-13', status: 'completed' },
    { id: 3, customer: 'Mike Johnson', service: 'TV', pack: 'Basic Package', amount: 299, time: '11:00 AM', date: '2024-06-13', status: 'pending' }
  ]);

  const [newRecharge, setNewRecharge] = useState({
    customer: '',
    service: '',
    company: '',
    pack: '',
    amount: 0
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Cable TV: SITI & GTPL only. Broadband: Alliance & GTPL only.
  const tvCompanies = [
    { value: "SITI", label: "SITI" },
    { value: "GTPL", label: "GTPL" }
  ];
  const internetCompanies = [
    { value: "Alliance", label: "Alliance" },
    { value: "GTPL", label: "GTPL" }
  ];

  // Find selected SITI pack
  const selectedSitiPack = newRecharge.company === 'SITI' && newRecharge.service === 'TV'
    ? SITI_PACKS.find(p => p.value === newRecharge.pack)
    : null;

  const filteredRecharges = recharges.filter(recharge => {
    const matchesSearch = recharge.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recharge.pack.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === 'all' || recharge.service === serviceFilter;
    const matchesStatus = statusFilter === 'all' || recharge.status === statusFilter;
    
    return matchesSearch && matchesService && matchesStatus;
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

    // Amount logic: for SITI, amount comes from pack; else, default/0.
    let amount = 0;
    if (newRecharge.company === 'SITI' && newRecharge.service === 'TV') {
      const packObj = SITI_PACKS.find(p => p.value === newRecharge.pack);
      amount = packObj ? packObj.price : 0;
    } else {
      amount = Number(newRecharge.amount) || 0;
    }

    const recharge: Recharge = {
      id: Date.now(),
      customer: newRecharge.customer,
      service: newRecharge.service,
      pack: newRecharge.pack || 'Standard',
      amount,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setRecharges([recharge, ...recharges]);
    setNewRecharge({ customer: '', service: '', company: '', pack: '', amount: 0 });
    
    toast({
      title: "Recharge Added",
      description: `Successfully recorded recharge for ${newRecharge.customer}`,
    });
  };

  const handleDeleteRecharge = (id: number) => {
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

  // Calculate stats
  const totalAmount = filteredRecharges.reduce((sum, r) => sum + r.amount, 0);
  const completedCount = filteredRecharges.filter(r => r.status === 'completed').length;
  const successRate = filteredRecharges.length > 0 ? Math.round((completedCount / filteredRecharges.length) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Recharge Tracking</CardTitle>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Total</div>
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
        {/* Add New Recharge Form */}
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
          {/* Company dropdown */}
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
          {/* Pack/Plan logic */}
          {newRecharge.service === "TV" && newRecharge.company === "SITI" ? (
            <Select
              value={newRecharge.pack}
              onValueChange={packValue => {
                const packObj = SITI_PACKS.find(p => p.value === packValue);
                setNewRecharge({
                  ...newRecharge,
                  pack: packValue,
                  amount: packObj ? packObj.price : 0
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pack/Plan Name" />
              </SelectTrigger>
              <SelectContent>
                {SITI_PACKS.map((pack, idx) => (
                  <SelectItem key={`${pack.value}-${pack.channelCount}-${idx}`} value={pack.value}>
                    {`${pack.label} (${pack.channelCount} ch) - ₹${pack.price}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              placeholder="Pack/Plan Name"
              type="text"
              value={newRecharge.pack}
              onChange={(e) => setNewRecharge({ ...newRecharge, pack: e.target.value })}
            />
          )}
          {/* Amount logic - only show for non-SITI or editable? */}
          {(newRecharge.company !== 'SITI' || newRecharge.service !== 'TV') && (
            <Input
              placeholder="Amount"
              type="number"
              min={0}
              value={newRecharge.amount}
              onChange={e => setNewRecharge({ ...newRecharge, amount: +e.target.value })}
            />
          )}
          {/* Show SITI pack price in read-only mode */}
          {(newRecharge.company === 'SITI' && newRecharge.service === 'TV' && selectedSitiPack) && (
            <Input
              placeholder="Amount"
              type="number"
              value={selectedSitiPack.price}
              readOnly
              className="bg-gray-100"
            />
          )}
        </div>
        <Button onClick={handleAddRecharge} className="w-full">
          Add Recharge
        </Button>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customer or pack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="TV">TV</SelectItem>
              <SelectItem value="Internet">Internet</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recharge List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredRecharges.map((recharge) => (
            <div key={recharge.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{recharge.customer}</div>
                <div className="text-sm text-muted-foreground">
                  {recharge.pack} • {recharge.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={recharge.service === 'TV' ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => toggleStatus(recharge.id)}
                >
                  {recharge.service}
                </Badge>
                <Badge 
                  variant={
                    recharge.status === 'completed' ? 'default' : 
                    recharge.status === 'pending' ? 'secondary' : 'destructive'
                  }
                  className="cursor-pointer"
                  onClick={() => toggleStatus(recharge.id)}
                >
                  {recharge.status}
                </Badge>
                <span className="font-bold">₹{recharge.amount}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRecharge(recharge.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRecharges.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No recharges found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
