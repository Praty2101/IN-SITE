@@ .. @@
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Bell, CheckCircle, Clock, AlertTriangle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Payment {
  id: number;
  customer: string;
  service: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
  status: 'pending' | 'reminded' | 'paid' | 'overdue';
  contactInfo?: string;
  customerId?: string;
  packageName?: string;
  sourceTable?: string;
}

export const UpcomingPayments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  useEffect(() => {
    fetchUpcomingPayments();
  }, []);

  const fetchUpcomingPayments = async () => {
    try {
      setLoading(true);
      
      // Fetch customers from all source tables and calculate upcoming payments
      const [jcResponse, bcResponse, gbResponse, mbResponse] = await Promise.all([
        supabase.from('JC').select('*').not('NAME', 'is', null),
        supabase.from('BC').select('*').not('NAME', 'is', null),
        supabase.from('GB').select('*').not('CustomerName', 'is', null),
        supabase.from('MB').select('*').not('CustomerName', 'is', null)
      ]);

      let allPayments: Payment[] = [];
      let paymentId = 1;

      // Process JC customers
      if (jcResponse.data) {
        const jcPayments = jcResponse.data
          .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
          .map((customer: any) => {
            const dueDate = getNextDueDate();
            const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return {
              id: paymentId++,
              customer: customer.NAME.trim(),
              service: 'Cable TV (JC)',
              amount: 299, // Default amount, you might want to calculate from package
              dueDate,
              daysLeft,
              status: getPaymentStatus(daysLeft),
              contactInfo: customer.MOBILE_PHONE?.toString() || 'N/A',
              customerId: `jc_${customer["VC No."] || customer.CONTRACT_NUMBER}`,
              packageName: customer.PACKAGE_NAME || 'Standard Package',
              sourceTable: 'JC'
            };
          });
        allPayments = [...allPayments, ...jcPayments];
      }

      // Process BC customers  
      if (bcResponse.data) {
        const bcPayments = bcResponse.data
          .filter((customer: any) => customer.NAME && customer.NAME.trim() !== '')
          .map((customer: any) => {
            const dueDate = getNextDueDate();
            const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return {
              id: paymentId++,
              customer: customer.NAME.trim(),
              service: 'Cable TV (BC)',
              amount: 299, // Default amount
              dueDate,
              daysLeft,
              status: getPaymentStatus(daysLeft),
              contactInfo: customer.MOBILE_PHONE?.toString() || 'N/A',
              customerId: `bc_${customer["VC No."] || customer.CONTRACT_NUMBER}`,
              packageName: customer.PACKAGE_NAME || 'Standard Package',
              sourceTable: 'BC'
            };
          });
        allPayments = [...allPayments, ...bcPayments];
      }

      // Process GB customers
      if (gbResponse.data) {
        const gbPayments = gbResponse.data
          .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
          .map((customer: any) => {
            const dueDate = getNextDueDate();
            const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return {
              id: paymentId++,
              customer: customer.CustomerName.trim(),
              service: 'Broadband (GB)',
              amount: customer.PackageAmount || 599, // Use actual package amount
              dueDate,
              daysLeft,
              status: getPaymentStatus(daysLeft),
              contactInfo: 'N/A',
              customerId: `gb_${customer.CustomerId}`,
              packageName: customer.Package || 'Standard Package',
              sourceTable: 'GB'
            };
          });
        allPayments = [...allPayments, ...gbPayments];
      }

      // Process MB customers
      if (mbResponse.data) {
        const mbPayments = mbResponse.data
          .filter((customer: any) => customer.CustomerName && customer.CustomerName.trim() !== '')
          .map((customer: any) => {
            const dueDate = getNextDueDate();
            const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return {
              id: paymentId++,
              customer: customer.CustomerName.trim(),
              service: 'Broadband (MB)',
              amount: customer.PackageAmount || 599, // Use actual package amount
              dueDate,
              daysLeft,
              status: getPaymentStatus(daysLeft),
              contactInfo: 'N/A',
              customerId: `mb_${customer.CustomerId}`,
              packageName: customer.Package || 'Standard Package',
              sourceTable: 'MB'
            };
          });
        allPayments = [...allPayments, ...mbPayments];
      }

      // Remove duplicates and sort by due date
      const uniquePayments = allPayments.filter((payment, index, self) => 
        index === self.findIndex((p) => p.customer === payment.customer && p.service === payment.service)
      ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

      setPayments(uniquePayments);
    } catch (error) {
      console.error('Error fetching upcoming payments:', error);
      toast({
        title: "Error",
        description: "Failed to load upcoming payments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate next due date (random within next 30 days)
  const getNextDueDate = () => {
    const today = new Date();
    const daysFromNow = Math.floor(Math.random() * 30) + 1; // 1-30 days from now
    const dueDate = new Date(today.getTime() + (daysFromNow * 24 * 60 * 60 * 1000));
    return dueDate.toISOString().split('T')[0];
  };

  // Helper function to determine payment status based on days left
  const getPaymentStatus = (daysLeft: number): 'pending' | 'reminded' | 'paid' | 'overdue' => {
    if (daysLeft < 0) return 'overdue';
    if (daysLeft <= 2) return 'pending';
    return 'pending';
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.packageName && payment.packageName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (daysLeft: number, status: string) => {
    if (status === 'paid') return 'default';
    if (status === 'overdue' || daysLeft < 0) return 'destructive';
    if (daysLeft <= 2) return 'destructive';
    if (daysLeft <= 5) return 'secondary';
    return 'outline';
  };

  const getPriorityIcon = (status: string, daysLeft: number) => {
    if (status === 'paid') return <CheckCircle className="h-4 w-4" />;
    if (status === 'overdue' || daysLeft < 0) return <AlertTriangle className="h-4 w-4" />;
    if (status === 'reminded') return <Bell className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const markAsPaid = (id: number) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: 'paid' as const } : p
    ));
    toast({
      title: "Payment Recorded",
      description: "Payment has been marked as completed.",
    });
  };

  const sendReminder = (id: number) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: 'reminded' as const } : p
    ));
    toast({
      title: "Reminder Sent",
      description: "Payment reminder has been sent to the customer.",
    });
  };

  const sendBulkReminders = () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select payments to send reminders for.",
        variant: "destructive"
      });
      return;
    }

    setPayments(payments.map(p => 
      selectedPayments.includes(p.id) ? { ...p, status: 'reminded' as const } : p
    ));
    setSelectedPayments([]);
    
    toast({
      title: "Bulk Reminders Sent",
      description: `Sent reminders for ${selectedPayments.length} payments.`,
    });
  };

  const toggleSelection = (id: number) => {
    setSelectedPayments(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    const eligiblePayments = filteredPayments
      .filter(p => p.status !== 'paid')
      .map(p => p.id);
    setSelectedPayments(eligiblePayments);
  };

  const clearSelection = () => {
    setSelectedPayments([]);
  };

  // Calculate stats
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const overdueCount = filteredPayments.filter(p => p.status === 'overdue' || p.daysLeft < 0).length;
  const urgentCount = filteredPayments.filter(p => p.daysLeft <= 2 && p.status !== 'paid').length;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading upcoming payments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Payments ({payments.length} customers)
            </CardTitle>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="font-bold">₹{totalAmount.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Overdue</div>
                <div className="font-bold text-red-600">{overdueCount}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Urgent</div>
                <div className="font-bold text-orange-600">{urgentCount}</div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search customers or packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reminded">Reminded</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear
            </Button>
            {selectedPayments.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedPayments.length} selected
              </span>
            )}
          </div>
          {selectedPayments.length > 0 && (
            <Button size="sm" onClick={sendBulkReminders}>
              <Send className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
          )}
        </div>

        {/* Payment List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredPayments.map((payment) => (
            <div 
              key={payment.id} 
              className={`flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                selectedPayments.includes(payment.id) ? 'bg-muted border-primary' : ''
              }`}
              onClick={() => payment.status !== 'paid' && toggleSelection(payment.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{payment.customer}</div>
                  {getPriorityIcon(payment.status, payment.daysLeft)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                  {payment.contactInfo && payment.contactInfo !== 'N/A' && (
                    <span className="ml-2">• {payment.contactInfo}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {payment.packageName} • {payment.sourceTable}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={payment.service.includes('TV') ? 'default' : 'secondary'}>
                  {payment.service.includes('TV') ? 'Cable TV' : 'Broadband'}
                </Badge>
                <Badge variant={getPriorityColor(payment.daysLeft, payment.status)}>
                  {payment.status === 'paid' ? 'Paid' :
                   payment.status === 'overdue' || payment.daysLeft < 0 ? 'Overdue' :
                   payment.status === 'reminded' ? 'Reminded' :
                   `${payment.daysLeft}d left`}
                </Badge>
                <div className="text-right">
                  <div className="font-bold">₹{payment.amount}</div>
                  <div className="flex gap-1">
                    {payment.status !== 'paid' && payment.status !== 'reminded' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          sendReminder(payment.id);
                        }}
                        className="h-6 px-2 text-xs"
                      >
                        Remind
                      </Button>
                    )}
                    {payment.status !== 'paid' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsPaid(payment.id);
                        }}
                        className="h-6 px-2 text-xs text-green-600 hover:text-green-700"
                      >
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No payments found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};