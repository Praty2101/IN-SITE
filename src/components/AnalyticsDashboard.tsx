import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar, ComposedChart, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Users, Wifi, Tv, DollarSign, Calendar, RefreshCw, Download, Activity, Target, Clock, AlertTriangle, CheckCircle, Star, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export const AnalyticsDashboard = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Enhanced Revenue Data
  const [revenueData, setRevenueData] = useState([
    { day: 'Mon', tv: 4000, internet: 2400, total: 6400, customers: 24, avgPerCustomer: 267 },
    { day: 'Tue', tv: 3000, internet: 1398, total: 4398, customers: 18, avgPerCustomer: 244 },
    { day: 'Wed', tv: 2000, internet: 9800, total: 11800, customers: 42, avgPerCustomer: 281 },
    { day: 'Thu', tv: 2780, internet: 3908, total: 6688, customers: 28, avgPerCustomer: 239 },
    { day: 'Fri', tv: 1890, internet: 4800, total: 6690, customers: 31, avgPerCustomer: 216 },
    { day: 'Sat', tv: 2390, internet: 3800, total: 6190, customers: 26, avgPerCustomer: 238 },
    { day: 'Sun', tv: 3490, internet: 4300, total: 7790, customers: 35, avgPerCustomer: 223 }
  ]);

  // Customer Growth Data
  const [customerGrowthData, setCustomerGrowthData] = useState([
    { month: 'Jan', newCustomers: 45, churnedCustomers: 8, netGrowth: 37, totalCustomers: 1245 },
    { month: 'Feb', newCustomers: 52, churnedCustomers: 12, netGrowth: 40, totalCustomers: 1285 },
    { month: 'Mar', newCustomers: 38, churnedCustomers: 15, netGrowth: 23, totalCustomers: 1308 },
    { month: 'Apr', newCustomers: 61, churnedCustomers: 9, netGrowth: 52, totalCustomers: 1360 },
    { month: 'May', newCustomers: 48, churnedCustomers: 11, netGrowth: 37, totalCustomers: 1397 },
    { month: 'Jun', newCustomers: 55, churnedCustomers: 7, netGrowth: 48, totalCustomers: 1445 }
  ]);

  // Service Performance Data
  const [servicePerformanceData, setServicePerformanceData] = useState([
    { service: 'Basic TV', satisfaction: 85, uptime: 99.2, complaints: 3, revenue: 125000 },
    { service: 'Premium TV', satisfaction: 92, uptime: 99.8, complaints: 1, revenue: 185000 },
    { service: '50 Mbps', satisfaction: 88, uptime: 98.9, complaints: 5, revenue: 95000 },
    { service: '100 Mbps', satisfaction: 94, uptime: 99.5, complaints: 2, revenue: 165000 },
    { service: '200 Mbps', satisfaction: 96, uptime: 99.7, complaints: 1, revenue: 145000 }
  ]);

  // Payment Method Distribution
  const [paymentMethodData, setPaymentMethodData] = useState([
    { method: 'UPI', value: 45, color: '#3b82f6', amount: 285000 },
    { method: 'Cash', value: 25, color: '#10b981', amount: 158000 },
    { method: 'Bank Transfer', value: 20, color: '#f59e0b', amount: 126000 },
    { method: 'Card', value: 10, color: '#ef4444', amount: 63000 }
  ]);

  // Geographic Revenue Distribution
  const [geographicData, setGeographicData] = useState([
    { area: 'North Zone', customers: 385, revenue: 245000, avgRevenue: 636, growth: 12.5 },
    { area: 'South Zone', customers: 420, revenue: 285000, avgRevenue: 679, growth: 8.3 },
    { area: 'East Zone', customers: 295, revenue: 185000, avgRevenue: 627, growth: 15.2 },
    { area: 'West Zone', customers: 345, revenue: 215000, avgRevenue: 623, growth: 6.8 }
  ]);

  // Hourly Usage Pattern
  const [hourlyUsageData, setHourlyUsageData] = useState([
    { hour: '00', usage: 15, bandwidth: 45 },
    { hour: '06', usage: 25, bandwidth: 65 },
    { hour: '12', usage: 65, bandwidth: 85 },
    { hour: '18', usage: 95, bandwidth: 98 },
    { hour: '21', usage: 100, bandwidth: 100 },
    { hour: '23', usage: 45, bandwidth: 70 }
  ]);

  // Plan Popularity with detailed metrics
  const [planPopularityData, setPlanPopularityData] = useState([
    { plan: 'Basic TV', count: 25, revenue: 7475, satisfaction: 85, churn: 2.1 },
    { plan: 'Premium TV', count: 18, revenue: 10782, satisfaction: 92, churn: 1.2 },
    { plan: 'Sports Pack', count: 12, revenue: 7188, satisfaction: 89, churn: 1.8 },
    { plan: '50 Mbps', count: 20, revenue: 15980, satisfaction: 88, churn: 2.5 },
    { plan: '100 Mbps', count: 15, revenue: 13485, satisfaction: 94, churn: 1.1 },
    { plan: '200 Mbps', count: 8, revenue: 8792, satisfaction: 96, churn: 0.8 }
  ]);

  // Enhanced Metrics
  const [metrics, setMetrics] = useState({
    arpu: 798,
    retention: 94.2,
    paymentSuccess: 97.8,
    growth: 12.5,
    churn: 2.1,
    peakHours: '8-11 PM',
    avgResolutionTime: 2.4,
    customerSatisfaction: 91.5,
    networkUptime: 99.4,
    supportTickets: 23,
    newSignups: 48,
    totalBandwidth: 2.4
  });

  const refreshData = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const variation = () => Math.random() * 0.2 - 0.1;
      
      setRevenueData(prev => prev.map(day => ({
        ...day,
        tv: Math.round(day.tv * (1 + variation())),
        internet: Math.round(day.internet * (1 + variation())),
        total: Math.round(day.total * (1 + variation())),
        customers: Math.round(day.customers * (1 + variation())),
        avgPerCustomer: Math.round(day.avgPerCustomer * (1 + variation()))
      })));

      setMetrics(prev => ({
        ...prev,
        arpu: Math.round(prev.arpu * (1 + variation())),
        retention: Math.round((prev.retention * (1 + variation())) * 10) / 10,
        paymentSuccess: Math.round((prev.paymentSuccess * (1 + variation())) * 10) / 10,
        growth: Math.round((prev.growth * (1 + variation())) * 10) / 10,
        churn: Math.round((prev.churn * (1 + variation())) * 10) / 10,
        customerSatisfaction: Math.round((prev.customerSatisfaction * (1 + variation())) * 10) / 10,
        networkUptime: Math.round((prev.networkUptime * (1 + variation())) * 10) / 10
      }));

      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Data Refreshed",
        description: "All analytics data has been updated successfully.",
      });
    }, 1500);
  };

  const exportData = () => {
    const data = {
      revenue: revenueData,
      customerGrowth: customerGrowthData,
      servicePerformance: servicePerformanceData,
      paymentMethods: paymentMethodData,
      geographic: geographicData,
      hourlyUsage: hourlyUsageData,
      planPopularity: planPopularityData,
      metrics: metrics,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprehensive-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({
      title: "Data Exported",
      description: "Comprehensive analytics data has been downloaded successfully.",
    });
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // Simulate data change based on time range
    if (value === '30d') {
      setRevenueData([
        { day: 'Week 1', tv: 28000, internet: 16800, total: 44800, customers: 168, avgPerCustomer: 267 },
        { day: 'Week 2', tv: 21000, internet: 9786, total: 30786, customers: 126, avgPerCustomer: 244 },
        { day: 'Week 3', tv: 14000, internet: 68600, total: 82600, customers: 294, avgPerCustomer: 281 },
        { day: 'Week 4', tv: 19460, internet: 27356, total: 46816, customers: 196, avgPerCustomer: 239 }
      ]);
    } else {
      setRevenueData([
        { day: 'Mon', tv: 4000, internet: 2400, total: 6400, customers: 24, avgPerCustomer: 267 },
        { day: 'Tue', tv: 3000, internet: 1398, total: 4398, customers: 18, avgPerCustomer: 244 },
        { day: 'Wed', tv: 2000, internet: 9800, total: 11800, customers: 42, avgPerCustomer: 281 },
        { day: 'Thu', tv: 2780, internet: 3908, total: 6688, customers: 28, avgPerCustomer: 239 },
        { day: 'Fri', tv: 1890, internet: 4800, total: 6690, customers: 31, avgPerCustomer: 216 },
        { day: 'Sat', tv: 2390, internet: 3800, total: 6190, customers: 26, avgPerCustomer: 238 },
        { day: 'Sun', tv: 3490, internet: 4300, total: 7790, customers: 35, avgPerCustomer: 223 }
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    tv: { label: "TV", color: "#3b82f6" },
    internet: { label: "Internet", color: "#10b981" },
    total: { label: "Total", color: "#f59e0b" },
    customers: { label: "Customers", color: "#8b5cf6" },
    newCustomers: { label: "New", color: "#10b981" },
    churnedCustomers: { label: "Churned", color: "#ef4444" },
    netGrowth: { label: "Net Growth", color: "#3b82f6" }
  };

  const totalRevenue = revenueData.reduce((sum, day) => sum + day.total, 0);
  const avgDailyRevenue = Math.round(totalRevenue / revenueData.length);
  const totalCustomers = revenueData.reduce((sum, day) => sum + day.customers, 0);

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

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{metrics.growth}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
                <p className="text-xs text-blue-600">+{metrics.newSignups} new</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ARPU</p>
                <p className="text-2xl font-bold">₹{metrics.arpu}</p>
                <p className="text-xs text-purple-600">Monthly</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{metrics.customerSatisfaction}%</p>
                <p className="text-xs text-yellow-600">Rating</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Uptime</p>
                <p className="text-2xl font-bold">{metrics.networkUptime}%</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold">{metrics.churn}%</p>
                <p className="text-xs text-orange-600">Monthly</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Revenue Trends - Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends ({timeRange === '7d' ? 'Daily' : 'Weekly'})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="total" stackId="1" stroke="var(--color-total)" fill="var(--color-total)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="tv" stackId="2" stroke="var(--color-tv)" fill="var(--color-tv)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="internet" stackId="2" stroke="var(--color-internet)" fill="var(--color-internet)" fillOpacity={0.6} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Growth - Composed Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ComposedChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" />
                <Bar dataKey="churnedCustomers" fill="var(--color-churnedCustomers)" />
                <Line type="monotone" dataKey="netGrowth" stroke="var(--color-netGrowth)" strokeWidth={3} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ method, value }) => `${method}: ${value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geographic Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={geographicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Service Performance - Radial Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Service Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <RadialBarChart data={servicePerformanceData} innerRadius="20%" outerRadius="80%">
                <RadialBar dataKey="satisfaction" cornerRadius={10} fill="#8884d8" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Usage Pattern - Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Hourly Usage Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={hourlyUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="bandwidth" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Plan Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tv className="h-5 w-5" />
              Plan Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planPopularityData.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{plan.plan}</div>
                    <div className="text-sm text-muted-foreground">
                      {plan.count} customers • ₹{plan.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={plan.satisfaction >= 90 ? 'default' : 'secondary'}>
                      {plan.satisfaction}% satisfaction
                    </Badge>
                    <Badge variant={plan.churn <= 1.5 ? 'default' : 'destructive'}>
                      {plan.churn}% churn
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{metrics.paymentSuccess}%</div>
                <div className="text-sm text-muted-foreground">Payment Success</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.retention}%</div>
                <div className="text-sm text-muted-foreground">Retention Rate</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{metrics.avgResolutionTime}h</div>
                <div className="text-sm text-muted-foreground">Avg Resolution</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{metrics.supportTickets}</div>
                <div className="text-sm text-muted-foreground">Open Tickets</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{metrics.totalBandwidth} TB</div>
                <div className="text-sm text-muted-foreground">Total Bandwidth</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{metrics.peakHours}</div>
                <div className="text-sm text-muted-foreground">Peak Hours</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-rose-600">₹{avgDailyRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Daily Avg Revenue</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">{metrics.newSignups}</div>
                <div className="text-sm text-muted-foreground">New Signups</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Satisfaction vs Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ScatterChart data={servicePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="satisfaction" name="Satisfaction" />
                <YAxis dataKey="revenue" name="Revenue" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter dataKey="revenue" fill="#8884d8" />
              </ScatterChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};