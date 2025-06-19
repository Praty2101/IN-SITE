
export interface Pack {
  label: string;
  value: string;
  channelCount: number;
  operatorPrice: number;
  customerPrice?: number;
}

// SITI Cable TV packs
export const SITI_PACKS: Pack[] = [
  { label: "SITI FAMILY PACK-250", value: "SITI FAMILY PACK-250", channelCount: 111, operatorPrice: 211.86, customerPrice: 250.00 },
  { label: "SFP BENGALI HINDI 320", value: "SFP BENGALI HINDI 320", channelCount: 141, operatorPrice: 271.19, customerPrice: 320.00 },
  { label: "SFP BENGALI HINDI 380", value: "SFP BENGALI HINDI 380", channelCount: 146, operatorPrice: 322.03, customerPrice: 380.00 },
  { label: "SFP BENGALI HINDI 450", value: "SFP BENGALI HINDI 450", channelCount: 157, operatorPrice: 381.36, customerPrice: 450.00 },
  { label: "SITI FAMILY PACK-490", value: "SITI FAMILY PACK-490", channelCount: 148, operatorPrice: 415.25, customerPrice: 490.00 },
  { label: "SFP BENGALI HINDI HD 600", value: "SFP BENGALI HINDI HD 600", channelCount: 171, operatorPrice: 508.48, customerPrice: 600.00 },
  { label: "SFP BENGALI HINDI 320 (Alt)", value: "SFP BENGALI HINDI 320-2", channelCount: 154, operatorPrice: 271.19, customerPrice: 320.00 },
  { label: "SFP BENGALI HINDI 380 (Alt)", value: "SFP BENGALI HINDI 380-2", channelCount: 159, operatorPrice: 322.03, customerPrice: 380.00 },
  { label: "SFP BENGALI HINDI 450 (Alt)", value: "SFP BENGALI HINDI 450-2", channelCount: 170, operatorPrice: 381.36, customerPrice: 450.00 },
  { label: "SITI FAMILY PACK-490 (Alt)", value: "SITI FAMILY PACK-490-2", channelCount: 161, operatorPrice: 415.25, customerPrice: 490.00 },
  { label: "SFP BENGALI HINDI HD 600 (Alt)", value: "SFP BENGALI HINDI HD 600-2", channelCount: 184, operatorPrice: 508.48, customerPrice: 600.00 },
  { label: "SFP TELUGU-350", value: "SFP TELUGU-350", channelCount: 138, operatorPrice: 296.61, customerPrice: 350.00 },
  { label: "SFP TELUGU-350 (Alt)", value: "SFP TELUGU-350-2", channelCount: 124, operatorPrice: 296.61, customerPrice: 350.00 },
  { label: "SITI FAMILY PACK-250 (Alt)", value: "SITI FAMILY PACK-250-2", channelCount: 123, operatorPrice: 211.86, customerPrice: 250.00 },
  { label: "SFP BENGALI HINDI HD 350", value: "SFP BENGALI HINDI HD 350", channelCount: 116, operatorPrice: 296.61, customerPrice: 350.00 },
  { label: "SITI-FAMILY HD -410", value: "SITI-FAMILY HD -410", channelCount: 129, operatorPrice: 347.46, customerPrice: 410.00 },
  { label: "SFP BENGALI HINDI HD 350 (Alt)", value: "SFP BENGALI HINDI HD 350-2", channelCount: 104, operatorPrice: 296.61, customerPrice: 350.00 },
  { label: "SITI-FAMILY HD-410", value: "SITI-FAMILY HD-410", channelCount: 117, operatorPrice: 347.46, customerPrice: 410.00 },
  { label: "SITI FAMILY PACK ORIYA - 225", value: "SITI FAMILY PACK ORIYA - 225", channelCount: 113, operatorPrice: 190.68, customerPrice: 225.00 },
  { label: "SITI-FAMILY HINDI 475", value: "SITI-FAMILY HINDI 475", channelCount: 159, operatorPrice: 402.54, customerPrice: 475.00 },
  { label: "SITI-FAMILY HINDI 475 (Alt)", value: "SITI-FAMILY HINDI 475-2", channelCount: 146, operatorPrice: 402.54, customerPrice: 475.00 },
  { label: "SITI FAMILY PACK ORIYA - 205", value: "SITI FAMILY PACK ORIYA - 205", channelCount: 70, operatorPrice: 173.73, customerPrice: 205.00 },
  { label: "SFP HINDI - 250", value: "SFP HINDI - 250", channelCount: 77, operatorPrice: 211.86, customerPrice: 250.00 },
  { label: "SFP HINDI - 250 (Alt)", value: "SFP HINDI - 250-2", channelCount: 67, operatorPrice: 211.86, customerPrice: 250.00 },
  { label: "SFP BENGALI HINDI HD 500", value: "SFP BENGALI HINDI HD 500", channelCount: 130, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SFP BENGALI HINDI HD 500 (Alt)", value: "SFP BENGALI HINDI HD 500-2", channelCount: 120, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SFP BENGALI 220", value: "SFP BENGALI 220", channelCount: 70, operatorPrice: 186.44, customerPrice: 220.00 },
  { label: "SFP BENGALI 220 (Alt)", value: "SFP BENGALI 220-2", channelCount: 60, operatorPrice: 186.44, customerPrice: 220.00 },
  { label: "SFP BENGALI HINDI HD 500 (Premium)", value: "SFP BENGALI HINDI HD 500-3", channelCount: 143, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SITI FAMILY PACK ORIYA - 205 (Alt)", value: "SITI FAMILY PACK ORIYA - 205-2", channelCount: 76, operatorPrice: 173.73, customerPrice: 205.00 },
  { label: "SITI FAMILY PACK ORIYA - 225 (Alt)", value: "SITI FAMILY PACK ORIYA - 225-2", channelCount: 82, operatorPrice: 190.68, customerPrice: 225.00 },
  { label: "SITI-FAMILY HINDI 380", value: "SITI-FAMILY HINDI 380", channelCount: 103, operatorPrice: 322.03, customerPrice: 380.00 },
  { label: "SITI-FAMILY HINDI 410", value: "SITI-FAMILY HINDI 410", channelCount: 143, operatorPrice: 347.46, customerPrice: 410.00 },
  { label: "SFP ORIYA 360", value: "SFP ORIYA 360", channelCount: 110, operatorPrice: 305.08, customerPrice: 360.00 },
  { label: "SFP ORIYA 270", value: "SFP ORIYA 270", channelCount: 87, operatorPrice: 228.81, customerPrice: 270.00 },
  { label: "SFP ORIYA HD 500", value: "SFP ORIYA HD 500", channelCount: 141, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SITI-FAMILY HINDI 380 (Alt)", value: "SITI-FAMILY HINDI 380-2", channelCount: 113, operatorPrice: 322.03, customerPrice: 380.00 },
  { label: "SITI-FAMILY HINDI 410 (Alt)", value: "SITI-FAMILY HINDI 410-2", channelCount: 118, operatorPrice: 347.46, customerPrice: 410.00 },
  { label: "SITI-FAMILY HINDI 410 (Premium)", value: "SITI-FAMILY HINDI 410-3", channelCount: 114, operatorPrice: 347.46, customerPrice: 410.00 },
  { label: "SFP ORIYA 360 (Alt)", value: "SFP ORIYA 360-2", channelCount: 118, operatorPrice: 305.08, customerPrice: 360.00 },
  { label: "SITI-FAMILY HINDI 320", value: "SITI-FAMILY HINDI 320", channelCount: 89, operatorPrice: 271.19, customerPrice: 320.00 },
  { label: "SITI-FAMILY HINDI 320 (Alt)", value: "SITI-FAMILY HINDI 320-2", channelCount: 79, operatorPrice: 271.19, customerPrice: 320.00 },
  { label: "SITI-FAMILY HINDI 320 (Premium)", value: "SITI-FAMILY HINDI 320-3", channelCount: 83, operatorPrice: 271.19, customerPrice: 320.00 },
  { label: "SFP ORIYA 270 (Alt)", value: "SFP ORIYA 270-2", channelCount: 95, operatorPrice: 228.81, customerPrice: 270.00 },
  { label: "SFP ORIYA HD 500 (Alt)", value: "SFP ORIYA HD 500-2", channelCount: 149, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SITI FAMILY PACK HINDI HD - 300", value: "SITI FAMILY PACK HINDI HD - 300", channelCount: 64, operatorPrice: 254.24, customerPrice: 300.00 },
  { label: "SITI FAMILY PACK HINDI HD - 300 (Alt)", value: "SITI FAMILY PACK HINDI HD - 300-2", channelCount: 75, operatorPrice: 254.24, customerPrice: 300.00 },
  { label: "SFP BENGALI-240", value: "SFP BENGALI-240", channelCount: 76, operatorPrice: 203.39, customerPrice: 240.00 },
  { label: "SITI-FAMILY HINDI HD 630", value: "SITI-FAMILY HINDI HD 630", channelCount: 127, operatorPrice: 533.90, customerPrice: 630.00 },
  { label: "SFP BENGALI-240 (Alt)", value: "SFP BENGALI-240-2", channelCount: 66, operatorPrice: 203.39, customerPrice: 240.00 },
  { label: "SITI-FAMILY HINDI HD 630A", value: "SITI-FAMILY HINDI HD 630A", channelCount: 116, operatorPrice: 533.90, customerPrice: 630.00 },
  { label: "SITI-FAMILY HINDI HD 630 (Alt)", value: "SITI-FAMILY HINDI HD 630-2", channelCount: 117, operatorPrice: 533.90, customerPrice: 630.00 },
  { label: "SITI FAMILY PACK 190", value: "SITI FAMILY PACK 190", channelCount: 55, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI FAMILY PACK 190 (Alt)", value: "SITI FAMILY PACK 190-2", channelCount: 45, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI FAMILY HINDI 190", value: "SITI FAMILY HINDI 190", channelCount: 56, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI FAMILY SPORTS 330", value: "SITI FAMILY SPORTS 330", channelCount: 90, operatorPrice: 279.66, customerPrice: 330.00 },
  { label: "SITI FAMILY SPORTS HINDI 325", value: "SITI FAMILY SPORTS HINDI 325", channelCount: 91, operatorPrice: 275.42, customerPrice: 325.00 },
  { label: "SITI FAMILY HINDI 190 (Alt)", value: "SITI FAMILY HINDI 190-2", channelCount: 46, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI FAMILY SPORTS 330 (Alt)", value: "SITI FAMILY SPORTS 330-2", channelCount: 80, operatorPrice: 279.66, customerPrice: 330.00 },
  { label: "SITI FAMILY SPORTS HINDI 325 (Alt)", value: "SITI FAMILY SPORTS HINDI 325-2", channelCount: 81, operatorPrice: 275.42, customerPrice: 325.00 },
  { label: "SFP BENGALI HINDI 270", value: "SFP BENGALI HINDI 270", channelCount: 104, operatorPrice: 228.81, customerPrice: 270.00 },
  { label: "SITI FAMILY PACK 360", value: "SITI FAMILY PACK 360", channelCount: 99, operatorPrice: 305.08, customerPrice: 360.00 },
  { label: "SFP HINDI 270", value: "SFP HINDI 270", channelCount: 96, operatorPrice: 228.81, customerPrice: 270.00 },
  { label: "SITI FAMILY PACK HINDI 350 NEW", value: "SITI FAMILY PACK HINDI 350 NEW", channelCount: 92, operatorPrice: 296.61, customerPrice: 350.00 },
  { label: "SFP ORIYA 400", value: "SFP ORIYA 400", channelCount: 131, operatorPrice: 338.98, customerPrice: 400.00 },
  { label: "SITI FAMILY PACK HD 650", value: "SITI FAMILY PACK HD 650", channelCount: 146, operatorPrice: 550.85, customerPrice: 650.00 },
  { label: "SITI FAMILY PACK 550", value: "SITI FAMILY PACK 550", channelCount: 129, operatorPrice: 466.10, customerPrice: 550.00 },
  { label: "SITI FAMILY PACK HD 650 (Alt)", value: "SITI FAMILY PACK HD 650-2", channelCount: 137, operatorPrice: 550.85, customerPrice: 650.00 },
  { label: "SITI FAMILY PACK 550 (Alt)", value: "SITI FAMILY PACK 550-2", channelCount: 119, operatorPrice: 466.10, customerPrice: 550.00 },
  { label: "SITI FAMILY PACK HINDI HD-500", value: "SITI FAMILY PACK HINDI HD-500", channelCount: 102, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SITI FAMILY PACK HINDI HD-500 (Alt)", value: "SITI FAMILY PACK HINDI HD-500-2", channelCount: 92, operatorPrice: 423.73, customerPrice: 500.00 },
  { label: "SITI FAMILY ORIYA 190", value: "SITI FAMILY ORIYA 190", channelCount: 55, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI FAMILY ORIYA 190 (Alt)", value: "SITI FAMILY ORIYA 190-2", channelCount: 45, operatorPrice: 161.02, customerPrice: 190.00 },
  { label: "SITI HD SPORTS 400", value: "SITI HD SPORTS 400", channelCount: 94, operatorPrice: 338.98, customerPrice: 400.00 },
  { label: "SITI HD SPORTS 400 (Alt)", value: "SITI HD SPORTS 400-2", channelCount: 84, operatorPrice: 338.98, customerPrice: 400.00 },
  { label: "BST JANTA", value: "BST JANTA", channelCount: 41, operatorPrice: 0.00, customerPrice: 0.00 },
  { label: "SFP BENGALI HINDI 270 (Alt)", value: "SFP BENGALI HINDI 270-2", channelCount: 94, operatorPrice: 228.81, customerPrice: 270.00 },
  { label: "SITI FAMILY PACK 360 (Alt)", value: "SITI FAMILY PACK 360-2", channelCount: 89, operatorPrice: 305.08, customerPrice: 360.00 },
  { label: "SFP HINDI 270 (Alt)", value: "SFP HINDI 270-2", channelCount: 86, operatorPrice: 228.81, customerPrice: 270.00 }
];

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

export const getPacksForService = (service: string, company: string): Pack[] => {
  if (service === "TV") {
    switch (company) {
      case "SITI":
        return SITI_PACKS;
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
