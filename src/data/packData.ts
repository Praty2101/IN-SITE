
import { useSitiPacks } from '@/hooks/useSitiPacks';
import { useAlliancePlans } from '@/hooks/useAlliancePlans';

export interface Pack {
  label: string;
  value: string;
  channelCount: number;
  operatorPrice: number;
  customerPrice?: number;
}

// GTPL Cable TV packs (placeholder - can be expanded)
export const GTPL_TV_PACKS: Pack[] = [
  { label: "GTPL Basic Package", value: "GTPL-BASIC", channelCount: 100, operatorPrice: 200.00, customerPrice: 250.00 },
  { label: "GTPL Premium Package", value: "GTPL-PREMIUM", channelCount: 150, operatorPrice: 400.00, customerPrice: 500.00 },
  { label: "GTPL HD Package", value: "GTPL-HD", channelCount: 120, operatorPrice: 350.00, customerPrice: 450.00 }
];

export const getPacksForService = (service: string, company: string, sitiPacks?: Pack[], alliancePlans?: Pack[], gtplBroadbandPlans?: Pack[]): Pack[] => {
  if (service === "TV") {
    switch (company) {
      case "SITI":
        return sitiPacks || [];
      case "GTPL":
        return GTPL_TV_PACKS;
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
