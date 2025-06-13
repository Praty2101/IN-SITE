
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Bell, CheckCircle, Clock, AlertTriangle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Payment {
  id: number;
  customer: string;
  service: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
  status: 'pending' | 'reminded' | 'paid' | 'overdue';
  contactInfo?: string;
}

export const UpcomingPayments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, customer: 'Alice Brown', service: 'TV', amount: 499, dueDate: '2024-06-15', daysLeft: 2, status: 'pending', contactInfo: '+91 9876543210' },
    { id: 2, customer: 'Bob Wilson', service: 'Internet', amount: 799, dueDate: '2024-06-16', daysLeft: 3, status: 'pending', contactInfo: '+91 9876543211' },
    { id: 3, customer: 'Carol Davis', service: 'TV', amount: 399, dueDate: '2024-06-17', daysLeft: 4, status: 'reminded', contactInfo: '+91 9876543212' },
    { id: 4, customer: 'David Miller', service: 'Internet', amount: 1099, dueDate: '2024-06-18', daysLeft: 5, status: 'pending', contactInfo: '+91 9876543213' },
    { id: 5, customer: 'Eva Garcia', service: 'TV', amount: 299, dueDate: '2024-06-12', daysLeft: -1, status: 'overdue', contactInfo: '+91 9876543214' }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Payments
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
            placeholder="Search customers..."
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
                  {payment.contactInfo && (
                    <span className="ml-2">• {payment.contactInfo}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={payment.service === 'TV' ? 'default' : 'secondary'}>
                  {payment.service}
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
