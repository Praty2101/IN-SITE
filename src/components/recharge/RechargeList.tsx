
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

interface Recharge {
  id: number;
  customer: string;
  service: string;
  pack: string;
  amount: number;
  customerPrice?: number;
  operatorPrice?: number;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

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
      <div className="text-center py-8 text-muted-foreground">
        <div className="text-lg font-medium">No recharges recorded yet</div>
        <div className="text-sm mt-1">Add your first recharge using the form above</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recharges.map((recharge) => (
        <div key={recharge.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base truncate">{recharge.customer}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {recharge.pack} • {recharge.time}
              </div>
              {recharge.customerPrice && recharge.operatorPrice && recharge.customerPrice !== recharge.operatorPrice && (
                <div className="text-xs text-muted-foreground mt-1">
                  Operator: ₹{recharge.operatorPrice}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={recharge.service === 'TV' ? 'default' : 'secondary'}
                  className="cursor-pointer text-xs px-2 py-1 min-h-6"
                  onClick={() => onToggleStatus(recharge.id)}
                >
                  {recharge.service}
                </Badge>
                <Badge 
                  variant={
                    recharge.status === 'completed' ? 'default' : 
                    recharge.status === 'pending' ? 'secondary' : 'destructive'
                  }
                  className="cursor-pointer text-xs px-2 py-1 min-h-6"
                  onClick={() => onToggleStatus(recharge.id)}
                >
                  {recharge.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="font-bold text-sm sm:text-base">₹{recharge.customerPrice || recharge.amount}</span>
                  <div className="text-xs text-muted-foreground">Customer</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRecharge(recharge.id)}
                  className="h-9 w-9 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
