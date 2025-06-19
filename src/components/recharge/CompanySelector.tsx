
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanySelectorProps {
  service: string;
  company: string;
  onCompanyChange: (company: string) => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  service,
  company,
  onCompanyChange
}) => {
  const tvCompanies = [
    { value: "SITI", label: "SITI" },
    { value: "GTPL", label: "GTPL" }
  ];
  
  const internetCompanies = [
    { value: "Alliance", label: "Alliance" },
    { value: "GTPL", label: "GTPL" }
  ];

  const companies = service === "TV" ? tvCompanies : internetCompanies;

  return (
    <Select
      value={company}
      onValueChange={onCompanyChange}
      disabled={!service}
    >
      <SelectTrigger>
        <SelectValue placeholder="Company" />
      </SelectTrigger>
      <SelectContent>
        {companies.map(comp => (
          <SelectItem key={comp.value} value={comp.value}>
            {comp.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
