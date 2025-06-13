
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const StatsCards = () => {
  const stats = [
    {
      title: 'Today\'s Recharges',
      value: '24',
      subtitle: 'TV & Internet',
      color: 'text-green-600'
    },
    {
      title: 'Pending Payments',
      value: '8',
      subtitle: 'Due this week',
      color: 'text-amber-600'
    },
    {
      title: 'Active Users',
      value: '156',
      subtitle: 'Total customers',
      color: 'text-blue-600'
    },
    {
      title: 'Revenue Today',
      value: '₹12,450',
      subtitle: 'All services',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
