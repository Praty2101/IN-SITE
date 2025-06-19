
import React from 'react';
import { Input } from '@/components/ui/input';
import { PackComboBox, Pack } from '@/components/PackComboBox';
import { getPacksForService } from '@/data/packData';

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
  const availablePacks = getPacksForService(service, company);
  const shouldShowComboBox = service === "TV" && company === "SITI";

  if (shouldShowComboBox) {
    return (
      <PackComboBox
        packs={availablePacks}
        value={selectedPack}
        onChange={onPackChange}
        placeholder="Search or choose pack..."
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
