
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Wifi, Tv, DollarSign, Calendar } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const revenueData = [
    { day: 'Mon', tv: 4000, internet: 2400, total: 6400 },
    { day: 'Tue', tv: 3000, internet: 1398, total: 4398 },
    { day: 'Wed', tv: 2000, internet: 9800, total: 11800 },
    { day: 'Thu', tv: 2780, internet: 3908, total: 6688 },
    { day: 'Fri', tv: 1890, internet: 4800, total: 6690 },
    { day: 'Sat', tv: 2390, internet: 3800, total: 6190 },
    { day: 'Sun', tv: 3490, internet: 4300, total: 7790 }
  ];

  const serviceDistribution = [
    { name: 'TV Only', value: 45, color: '#3b82f6' },
    { name: 'Internet Only', value: 30, color: '#10b981' },
    { name: 'TV + Internet', value: 25, color: '#f59e0b' }
  ];

  const planPopularity = [
    { plan: 'Basic TV', count: 25, revenue: 7475 },
    { plan: 'Premium TV', count: 18, revenue: 10782 },
    { plan: 'Sports Pack', count: 12, revenue: 7188 },
    { plan: '50 Mbps', count: 20, revenue: 15980 },
    { plan: '100 Mbps', count: 15, revenue: 13485 },
    { plan: '200 Mbps', count: 8, revenue: 8792 }
  ];

  const chartConfig = {
    tv: { label: "TV", color: "#3b82f6" },
    internet: { label: "Internet", color: "#10b981" },
    total: { label: "Total", color: "#f59e0b" }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Revenue Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Revenue Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="tv" stroke="var(--color-tv)" strokeWidth={2} />
              <Line type="monotone" dataKey="internet" stroke="var(--color-internet)" strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Service Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Service Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Plan Popularity */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tv className="h-5 w-5" />
            Most Popular Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={planPopularity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Revenue per User</span>
              <span className="font-medium">₹798</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Customer Retention Rate</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment Success Rate</span>
              <span className="font-medium text-green-600">97.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Monthly Growth</span>
              <span className="font-medium text-blue-600">+12.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Churn Rate</span>
              <span className="font-medium text-amber-600">2.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Peak Usage Hours</span>
              <span className="font-medium">8-11 PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
