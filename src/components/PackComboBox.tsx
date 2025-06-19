
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

export interface Pack {
  label: string;
  value: string;
  channelCount: number;
  operatorPrice: number; // Deductible price for operator
  customerPrice?: number; // Customer price, if different (optional for backwards compatibility)
}

interface PackComboBoxProps {
  packs: Pack[];
  value: Pack | null;  // Selected pack
  onChange: (pack: Pack) => void;  // Triggered on selection
  placeholder?: string;
}

export const PackComboBox: React.FC<PackComboBoxProps> = ({
  packs,
  value,
  onChange,
  placeholder = 'Search or choose pack...',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Fuzzy search (searches label, price, and channelCount)
  const filtered = useMemo(() => {
    if (!search) return packs;
    const low = search.toLowerCase();
    return packs.filter(
      pack =>
        pack.label.toLowerCase().includes(low) ||
        String(pack.channelCount).includes(low) ||
        String(pack.operatorPrice).includes(low) ||
        (pack.customerPrice !== undefined && String(pack.customerPrice).includes(low))
    );
  }, [packs, search]);

  const displayValue = value ? value.label : search;

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        value={displayValue}
        onChange={e => {
          setSearch(e.target.value);
          // Clear selection when typing
          if (value) {
            onChange(null);
          }
        }}
        className="cursor-text"
      />
      {open && (
        <div className="absolute z-50 bg-white dark:bg-background border border-border mt-1 w-full rounded shadow-lg animate-in fade-in-0">
          <Command>
            <CommandList>
              <CommandEmpty>No pack found.</CommandEmpty>
              <CommandGroup>
                {filtered.map((pack, idx) => (
                  <CommandItem
                    key={`${pack.value}-${pack.channelCount}-${pack.operatorPrice}-${idx}`}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      onChange(pack);
                      setSearch('');
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>
                        <span className="font-medium">{pack.label}</span>
                        <span className="text-xs ml-2 text-muted-foreground">{pack.channelCount} ch</span>
                      </span>
                      <span className="flex flex-col items-end ml-2">
                        {'customerPrice' in pack && pack.customerPrice !== undefined ? (
                          <>
                            <Badge variant="outline" className="mb-0.5 whitespace-nowrap">₹{pack.customerPrice} / ₹{pack.operatorPrice}</Badge>
                            <span className="text-[10px] text-muted-foreground">Cust./Operator</span>
                          </>
                        ) : (
                          <Badge variant="outline">₹{pack.operatorPrice}</Badge>
                        )}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
