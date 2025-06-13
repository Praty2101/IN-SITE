
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export const UpcomingPayments = () => {
  const upcomingPayments = [
    { id: 1, customer: 'Alice Brown', service: 'TV', amount: 499, dueDate: '2024-06-15', daysLeft: 2 },
    { id: 2, customer: 'Bob Wilson', service: 'Internet', amount: 799, dueDate: '2024-06-16', daysLeft: 3 },
    { id: 3, customer: 'Carol Davis', service: 'TV', amount: 399, dueDate: '2024-06-17', daysLeft: 4 },
    { id: 4, customer: 'David Miller', service: 'Internet', amount: 1099, dueDate: '2024-06-18', daysLeft: 5 }
  ];

  const getPriorityColor = (daysLeft: number) => {
    if (daysLeft <= 2) return 'destructive';
    if (daysLeft <= 5) return 'default';
    return 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{payment.customer}</div>
                <div className="text-sm text-muted-foreground">
                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={payment.service === 'TV' ? 'default' : 'secondary'}>
                  {payment.service}
                </Badge>
                <Badge variant={getPriorityColor(payment.daysLeft)}>
                  {payment.daysLeft}d left
                </Badge>
                <div className="text-right">
                  <div className="font-bold">₹{payment.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Send Payment Reminders
        </Button>
      </CardContent>
    </Card>
  );
};
