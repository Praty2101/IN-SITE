
import { useSitiPacks } from '@/hooks/useSitiPacks';

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

// Alliance Broadband plans (placeholder - can be expanded)
export const ALLIANCE_BROADBAND_PLANS: Pack[] = [
  { label: "Alliance 50 Mbps", value: "ALLIANCE-50", channelCount: 0, operatorPrice: 600.00, customerPrice: 750.00 },
  { label: "Alliance 100 Mbps", value: "ALLIANCE-100", channelCount: 0, operatorPrice: 900.00, customerPrice: 1000.00 },
  { label: "Alliance 200 Mbps", value: "ALLIANCE-200", channelCount: 0, operatorPrice: 1200.00, customerPrice: 1500.00 }
];

// GTPL Broadband plans (placeholder - can be expanded)
export const GTPL_BROADBAND_PLANS: Pack[] = [
  { label: "GTPL 25 Mbps", value: "GTPL-25", channelCount: 0, operatorPrice: 500.00, customerPrice: 600.00 },
  { label: "GTPL 50 Mbps", value: "GTPL-50", channelCount: 0, operatorPrice: 700.00, customerPrice: 850.00 },
  { label: "GTPL 100 Mbps", value: "GTPL-100", channelCount: 0, operatorPrice: 1000.00, customerPrice: 1200.00 }
];

export const getPacksForService = (service: string, company: string, sitiPacks?: Pack[]): Pack[] => {
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
        return ALLIANCE_BROADBAND_PLANS;
      case "GTPL":
        return GTPL_BROADBAND_PLANS;
      default:
        return [];
    }
  }
  return [];
};
