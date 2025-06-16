
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import type { Recharge } from '@/types/recharge';

interface RechargeListProps {
  recharges: Recharge[];
  onDeleteRecharge: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export const RechargeList: React.FC<RechargeListProps> = ({
  recharges,
  onDeleteRecharge,
  onToggleStatus
}) => {
  if (recharges.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No recharges found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {recharges.map((recharge) => (
        <div key={recharge.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <div className="flex-1">
            <div className="font-medium">{recharge.customer}</div>
            <div className="text-sm text-muted-foreground">
              {recharge.pack} • {recharge.time}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={recharge.service === 'TV' ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => onToggleStatus(recharge.id)}
            >
              {recharge.service}
            </Badge>
            <Badge 
              variant={
                recharge.status === 'completed' ? 'default' : 
                recharge.status === 'pending' ? 'secondary' : 'destructive'
              }
              className="cursor-pointer"
              onClick={() => onToggleStatus(recharge.id)}
            >
              {recharge.status}
            </Badge>
            <span className="font-bold">₹{recharge.amount}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteRecharge(recharge.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
