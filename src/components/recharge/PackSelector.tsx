
import React from 'react';
import { Input } from '@/components/ui/input';
import { PackComboBox, Pack } from '@/components/PackComboBox';
import { getPacksForService } from '@/data/packData';
import { useSitiPacks } from '@/hooks/useSitiPacks';

interface PackSelectorProps {
  service: string;
  company: string;
  selectedPack: Pack | null;
  packName: string;
  onPackChange: (pack: Pack | null) => void;
  onPackNameChange: (name: string) => void;
}

export const PackSelector: React.FC<PackSelectorProps> = ({
  service,
  company,
  selectedPack,
  packName,
  onPackChange,
  onPackNameChange
}) => {
  const { packs: sitiPacks, loading: sitiLoading } = useSitiPacks();
  
  const shouldShowComboBox = service === "TV" && company === "SITI";
  const availablePacks = getPacksForService(service, company, sitiPacks);

  if (shouldShowComboBox) {
    if (sitiLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-muted-foreground">Loading SITI packs...</div>
        </div>
      );
    }

    return (
      <PackComboBox
        packs={availablePacks}
        value={selectedPack}
        onChange={onPackChange}
        placeholder="Search or choose SITI pack..."
      />
    );
  }

  return (
    <Input
      placeholder="Pack/Plan Name"
      type="text"
      value={packName}
      onChange={(e) => onPackNameChange(e.target.value)}
    />
  );
};
