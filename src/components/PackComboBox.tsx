import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { SitiPack } from '@/hooks/useSitiPacks';

export interface Pack {
  label: string;
  value: string;
  channelCount: number;
  operatorPrice: number;
  customerPrice?: number;
}

interface PackComboBoxProps {
  packs: SitiPack[];
  value: string;
  onChange: (value: string) => void;
  onSelectPack?: (pack: SitiPack) => void;
  placeholder?: string;
}

export const PackComboBox: React.FC<PackComboBoxProps> = ({
  packs,
  value,
  onChange,
  onSelectPack,
  placeholder = 'Search or choose pack...',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Find selected pack for display
  const selectedPack = packs.find(p => p.pack_name === value);

  // Convert database packs to display format and filter
  const filtered = useMemo(() => {
    if (!search) return packs;
    const low = search.toLowerCase();
    return packs.filter(
      pack =>
        (pack.pack_name?.toLowerCase().includes(low)) ||
        String(pack.channel_count || 0).includes(low) ||
        String(pack.deductible_amount || 0).includes(low) ||
        String(pack.actual_price || 0).includes(low)
    );
  }, [packs, search]);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        value={search || (selectedPack ? selectedPack.pack_name || '' : value)}
        onChange={e => {
          setSearch(e.target.value);
          onChange('');
        }}
        className="cursor-text"
      />
      {open && (
        <div className="absolute z-50 bg-white dark:bg-background border border-border mt-1 w-full rounded shadow-lg animate-in fade-in-0 max-h-80 overflow-y-auto">
          <Command>
            <CommandList>
              <CommandEmpty>No pack found.</CommandEmpty>
              <CommandGroup>
                {filtered.map((pack, idx) => {
                  const isActive = pack.pack_name === value;
                  return (
                  <CommandItem
                    key={`${pack.pack_id}-${idx}`}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      onChange(pack.pack_name || '');
                      setSearch('');
                      setOpen(false);
                      if (onSelectPack) onSelectPack(pack);
                    }}
                    className={`flex items-center justify-between w-full p-3 ${
                      isActive
                        ? 'bg-accent/50 dark:bg-accent/60 font-semibold ring-1 ring-accent'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {isActive && (
                        <Check className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{pack.pack_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {pack.channel_count || 0} channels • ID: {pack.pack_id}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      {pack.actual_price && pack.deductible_amount ? (
                        <>
                          <Badge variant="outline" className="mb-0.5 whitespace-nowrap text-xs">
                            ₹{pack.actual_price} / ₹{pack.deductible_amount}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">Cust./Operator</span>
                        </>
                      ) : pack.actual_price ? (
                        <Badge variant="outline" className="text-xs">₹{pack.actual_price}</Badge>
                      ) : pack.deductible_amount ? (
                        <Badge variant="outline" className="text-xs">₹{pack.deductible_amount}</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Contact for Price</Badge>
                      )}
                    </div>
                  </CommandItem>
                )})}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};