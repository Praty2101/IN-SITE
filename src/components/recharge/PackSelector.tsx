
import React from 'react';
import { Input } from '@/components/ui/input';
import { PackComboBox, Pack } from '@/components/PackComboBox';
import { getPacksForService } from '@/data/packData';
import { useSitiPacks } from '@/hooks/useSitiPacks';
import { useAlliancePlans } from '@/hooks/useAlliancePlans';
import { useGtplBroadbandPlans } from '@/hooks/useGtplBroadbandPlans';
import { useGtplTvPacks } from '@/hooks/useGtplTvPacks';

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
  const { plans: gtplBroadbandPlans, loading: gtplBroadbandLoading } = useGtplBroadbandPlans();
  const { packs: gtplTvPacks, loading: gtplTvLoading } = useGtplTvPacks();
  
  const shouldShowComboBox = (service === "TV" && company === "SITI") || 
                             (service === "TV" && company === "GTPL") ||
                             (service === "Internet" && company === "Alliance") ||
                             (service === "Internet" && company === "GTPL");
  
  const availablePacks = getPacksForService(service, company, sitiPacks, alliancePlans, gtplBroadbandPlans, gtplTvPacks);

  if (shouldShowComboBox) {
    const isLoading = (service === "TV" && company === "SITI" && sitiLoading) || 
                     (service === "TV" && company === "GTPL" && gtplTvLoading) ||
                     (service === "Internet" && company === "Alliance" && allianceLoading) ||
                     (service === "Internet" && company === "GTPL" && gtplBroadbandLoading);
    
    if (isLoading) {
      let loadingText = "Loading packs...";
      if (service === "TV" && company === "SITI") {
        loadingText = "Loading SITI packs...";
      } else if (service === "TV" && company === "GTPL") {
        loadingText = "Loading GTPL TV packs...";
      } else if (service === "Internet" && company === "Alliance") {
        loadingText = "Loading Alliance plans...";
      } else if (service === "Internet" && company === "GTPL") {
        loadingText = "Loading GTPL broadband plans...";
      }
      
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-muted-foreground">{loadingText}</div>
        </div>
      );
    }

    let placeholder = "Search or choose pack...";
    if (service === "TV" && company === "SITI") {
      placeholder = "Search or choose SITI pack...";
    } else if (service === "TV" && company === "GTPL") {
      placeholder = "Search or choose GTPL TV pack...";
    } else if (service === "Internet" && company === "Alliance") {
      placeholder = "Search or choose Alliance plan...";
    } else if (service === "Internet" && company === "GTPL") {
      placeholder = "Search or choose GTPL broadband plan...";
    }

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
