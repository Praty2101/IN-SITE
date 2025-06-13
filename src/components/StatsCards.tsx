
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Wifi } from 'lucide-react';

export const StatsCards = () => {
  const stats = [
    {
      title: 'Today\'s Recharges',
      value: '24',
      subtitle: 'TV & Internet',
      color: 'text-green-600',
      trend: '+12%',
      trendUp: true,
      icon: TrendingUp,
      details: 'TV: 16, Internet: 8'
    },
    {
      title: 'Pending Payments',
      value: '8',
      subtitle: 'Due this week',
      color: 'text-amber-600',
      trend: '-5%',
      trendUp: false,
      icon: Users,
      details: 'Critical: 3, Normal: 5'
    },
    {
      title: 'Active Users',
      value: '156',
      subtitle: 'Total customers',
      color: 'text-blue-600',
      trend: '+8%',
      trendUp: true,
      icon: Users,
      details: 'New this month: 12'
    },
    {
      title: 'Revenue Today',
      value: '₹12,450',
      subtitle: 'All services',
      color: 'text-green-600',
      trend: '+15%',
      trendUp: true,
      icon: TrendingUp,
      details: 'Avg per customer: ₹798'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">{stat.title}</div>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
              <div className={`text-xs flex items-center gap-1 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{stat.details}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
