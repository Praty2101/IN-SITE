
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Wifi, Tv, DollarSign, Calendar, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const AnalyticsDashboard = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [revenueData, setRevenueData] = useState([
    { day: 'Mon', tv: 4000, internet: 2400, total: 6400 },
    { day: 'Tue', tv: 3000, internet: 1398, total: 4398 },
    { day: 'Wed', tv: 2000, internet: 9800, total: 11800 },
    { day: 'Thu', tv: 2780, internet: 3908, total: 6688 },
    { day: 'Fri', tv: 1890, internet: 4800, total: 6690 },
    { day: 'Sat', tv: 2390, internet: 3800, total: 6190 },
    { day: 'Sun', tv: 3490, internet: 4300, total: 7790 }
  ]);

  const [serviceDistribution, setServiceDistribution] = useState([
    { name: 'TV Only', value: 45, color: '#3b82f6' },
    { name: 'Internet Only', value: 30, color: '#10b981' },
    { name: 'TV + Internet', value: 25, color: '#f59e0b' }
  ]);

  const [planPopularity, setPlanPopularity] = useState([
    { plan: 'Basic TV', count: 25, revenue: 7475 },
    { plan: 'Premium TV', count: 18, revenue: 10782 },
    { plan: 'Sports Pack', count: 12, revenue: 7188 },
    { plan: '50 Mbps', count: 20, revenue: 15980 },
    { plan: '100 Mbps', count: 15, revenue: 13485 },
    { plan: '200 Mbps', count: 8, revenue: 8792 }
  ]);

  const [metrics, setMetrics] = useState({
    arpu: 798,
    retention: 94.2,
    paymentSuccess: 97.8,
    growth: 12.5,
    churn: 2.1,
    peakHours: '8-11 PM'
  });

  const refreshData = async () => {
    setIsLoading(true);
    
    // Simulate API call with realistic data variations
    setTimeout(() => {
      const variation = () => Math.random() * 0.2 - 0.1; // ±10% variation
      
      setRevenueData(prev => prev.map(day => ({
        ...day,
        tv: Math.round(day.tv * (1 + variation())),
        internet: Math.round(day.internet * (1 + variation())),
        total: Math.round(day.total * (1 + variation()))
      })));

      setMetrics(prev => ({
        ...prev,
        arpu: Math.round(prev.arpu * (1 + variation())),
        retention: Math.round((prev.retention * (1 + variation())) * 10) / 10,
        paymentSuccess: Math.round((prev.paymentSuccess * (1 + variation())) * 10) / 10,
        growth: Math.round((prev.growth * (1 + variation())) * 10) / 10,
        churn: Math.round((prev.churn * (1 + variation())) * 10) / 10
      }));

      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "Analytics data has been updated successfully.",
      });
    }, 1500);
  };

  const exportData = () => {
    const data = {
      revenue: revenueData,
      services: serviceDistribution,
      plans: planPopularity,
      metrics: metrics,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({
      title: "Data Exported",
      description: "Analytics data has been downloaded successfully.",
    });
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // Simulate data change based on time range
    if (value === '30d') {
      // Show monthly data
      setRevenueData([
        { day: 'Week 1', tv: 28000, internet: 16800, total: 44800 },
        { day: 'Week 2', tv: 21000, internet: 9786, total: 30786 },
        { day: 'Week 3', tv: 14000, internet: 68600, total: 82600 },
        { day: 'Week 4', tv: 19460, internet: 27356, total: 46816 }
      ]);
    } else {
      // Reset to daily data
      setRevenueData([
        { day: 'Mon', tv: 4000, internet: 2400, total: 6400 },
        { day: 'Tue', tv: 3000, internet: 1398, total: 4398 },
        { day: 'Wed', tv: 2000, internet: 9800, total: 11800 },
        { day: 'Thu', tv: 2780, internet: 3908, total: 6688 },
        { day: 'Fri', tv: 1890, internet: 4800, total: 6690 },
        { day: 'Sat', tv: 2390, internet: 3800, total: 6190 },
        { day: 'Sun', tv: 3490, internet: 4300, total: 7790 }
      ]);
    }
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    tv: { label: "TV", color: "#3b82f6" },
    internet: { label: "Internet", color: "#10b981" },
    total: { label: "Total", color: "#f59e0b" }
  };

  const totalRevenue = revenueData.reduce((sum, day) => sum + day.total, 0);
  const avgDailyRevenue = Math.round(totalRevenue / revenueData.length);
  const tvShare = Math.round((revenueData.reduce((sum, day) => sum + day.tv, 0) / totalRevenue) * 100);
  const internetShare = 100 - tvShare;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Daily Revenue</p>
                <p className="text-2xl font-bold">₹{avgDailyRevenue.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">TV Revenue Share</p>
                <p className="text-2xl font-bold">{tvShare}%</p>
              </div>
              <Tv className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Internet Share</p>
                <p className="text-2xl font-bold">{internetShare}%</p>
              </div>
              <Wifi className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Revenue Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Analysis ({timeRange === '7d' ? 'Daily' : 'Weekly'})
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
                <span className="font-medium">₹{metrics.arpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Customer Retention Rate</span>
                <span className="font-medium text-green-600">{metrics.retention}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Success Rate</span>
                <span className="font-medium text-green-600">{metrics.paymentSuccess}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Growth</span>
                <span className="font-medium text-blue-600">+{metrics.growth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Churn Rate</span>
                <span className="font-medium text-amber-600">{metrics.churn}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Usage Hours</span>
                <span className="font-medium">{metrics.peakHours}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
