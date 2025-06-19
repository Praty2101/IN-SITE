
import React from 'react';
import { Pack } from '@/data/packData';

interface SelectedPackDisplayProps {
  service: string;
  company: string;
  selectedPack: Pack | null;
}

export const SelectedPackDisplay: React.FC<SelectedPackDisplayProps> = ({
  service,
  company,
  selectedPack
}) => {
  if (!(company === 'SITI' && service === 'TV' && selectedPack)) {
    return null;
  }

  return (
    <div className="col-span-2 p-3 bg-muted rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{selectedPack.label}</div>
          <div className="text-sm text-muted-foreground">
            {selectedPack.channelCount} channels
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">
            ₹{selectedPack.customerPrice ?? selectedPack.operatorPrice}
          </div>
          {selectedPack.customerPrice !== undefined && (
            <div className="text-sm text-muted-foreground">
              Operator: ₹{selectedPack.operatorPrice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
