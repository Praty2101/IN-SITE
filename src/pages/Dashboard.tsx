
import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsCards } from '@/components/StatsCards';
import { RechargeTracker } from '@/components/RechargeTracker';
import { UpcomingPayments } from '@/components/UpcomingPayments';
import { UserManagement } from '@/components/UserManagement';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <StatsCards />
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="order-1">
            <RechargeTracker />
          </div>
          <div className="order-2">
            <UpcomingPayments />
          </div>
        </div>
        <UserManagement />
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
