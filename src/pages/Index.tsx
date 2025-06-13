
import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsCards } from '@/components/StatsCards';
import { RechargeTracker } from '@/components/RechargeTracker';
import { UpcomingPayments } from '@/components/UpcomingPayments';
import { UserManagement } from '@/components/UserManagement';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RechargeTracker />
          <UpcomingPayments />
        </div>
        <UserManagement />
      </div>
    </div>
  );
};

export default Index;
