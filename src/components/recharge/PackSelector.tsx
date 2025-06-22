
import React from 'react';
import { Input } from '@/components/ui/input';
import { PackComboBox, Pack } from '@/components/PackComboBox';
import { getPacksForService } from '@/data/packData';
import { useSitiPacks } from '@/hooks/useSitiPacks';
import { useAlliancePlans } from '@/hooks/useAlliancePlans';

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
  const { plans: alliancePlans, loading: allianceLoading } = useAlliancePlans();
  
  const shouldShowComboBox = (service === "TV" && company === "SITI") || (service === "Internet" && company === "Alliance");
  const availablePacks = getPacksForService(service, company, sitiPacks, alliancePlans);

  if (shouldShowComboBox) {
    const isLoading = (service === "TV" && company === "SITI" && sitiLoading) || 
                     (service === "Internet" && company === "Alliance" && allianceLoading);
    
    if (isLoading) {
      const loadingText = service === "TV" ? "Loading SITI packs..." : "Loading Alliance plans...";
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-muted-foreground">{loadingText}</div>
        </div>
      );
    }

    const placeholder = service === "TV" 
      ? "Search or choose SITI pack..." 
      : "Search or choose Alliance plan...";

    return (
      <PackComboBox
        packs={availablePacks}
        value={selectedPack}
        onChange={onPackChange}
        placeholder={placeholder}
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
