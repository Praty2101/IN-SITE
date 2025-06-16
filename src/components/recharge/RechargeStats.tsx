
import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { Recharge } from '@/types/recharge';

interface RechargeStatsProps {
  recharges: Recharge[];
}

export const RechargeStats: React.FC<RechargeStatsProps> = ({ recharges }) => {
  const totalAmount = recharges.reduce((sum, r) => sum + r.amount, 0);
  const completedCount = recharges.filter(r => r.status === 'completed').length;
  const successRate = recharges.length > 0 ? Math.round((completedCount / recharges.length) * 100) : 0;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">Daily Recharge Tracking</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="font-bold">₹{totalAmount.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Count</div>
            <div className="font-bold">{recharges.length}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="font-bold text-green-600">{successRate}%</div>
          </div>
        </div>
      </div>
      <TrendingUp className="h-8 w-8 text-blue-600" />
    </div>
  );
};
