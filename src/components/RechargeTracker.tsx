
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Search, Filter, TrendingUp } from 'lucide-react';
import { PackComboBox } from './PackComboBox';
import { useSitiPacks } from '@/hooks/useSitiPacks';

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
  const { data: sitiPacks = [], isLoading: packsLoading, error: packsError } = useSitiPacks();
  
  const [recharges, setRecharges] = useState<Recharge[]>([
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

  // Find selected SITI pack for price display
  const selectedSitiPack = newRecharge.company === 'SITI' && newRecharge.service === 'TV'
    ? sitiPacks.find(p => p.pack_name === newRecharge.pack)
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
      const packObj = sitiPacks.find(p => p.pack_name === newRecharge.pack);
      amount = packObj?.actual_price ?? packObj?.deductible_amount ?? 0;
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

  if (packsError) {
    console.error('Error loading SITI packs:', packsError);
  }

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
