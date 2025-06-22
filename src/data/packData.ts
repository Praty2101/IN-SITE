
import { useSitiPacks } from '@/hooks/useSitiPacks';
import { useAlliancePlans } from '@/hooks/useAlliancePlans';

export interface Pack {
  label: string;
  value: string;
  channelCount: number;
  operatorPrice: number;
  customerPrice?: number;
}

export const getPacksForService = (
  service: string, 
  company: string, 
  sitiPacks?: Pack[], 
  alliancePlans?: Pack[], 
  gtplBroadbandPlans?: Pack[],
  gtplTvPacks?: Pack[]
): Pack[] => {
  if (service === "TV") {
    switch (company) {
      case "SITI":
        return sitiPacks || [];
      case "GTPL":
        return gtplTvPacks || [];
      default:
        return [];
    }
  } else if (service === "Internet") {
    switch (company) {
      case "Alliance":
        return alliancePlans || [];
      case "GTPL":
        return gtplBroadbandPlans || [];
      default:
        return [];
    }
  }
  return [];
};
