
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

interface Pack {
  label: string;
  value: string;
  channelCount: number;
  price: number;
}
interface PackComboBoxProps {
  packs: Pack[];
  value: string;
  onChange: (value: string) => void;
  onSelectPack?: (pack: Pack) => void;
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
  const selectedPack = packs.find(p => p.value === value);

  // Fuzzy search (searches label, price, and channelCount)
  const filtered = useMemo(() => {
    if (!search) return packs;
    const low = search.toLowerCase();
    return packs.filter(
      pack =>
        pack.label.toLowerCase().includes(low) ||
        String(pack.channelCount).includes(low) ||
        String(pack.price).includes(low)
    );
  }, [packs, search]);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        value={search || (selectedPack ? selectedPack.label : value)}
        onChange={e => {
          setSearch(e.target.value);
          onChange(''); // clear selection on typing
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
                    key={`${pack.value}-${pack.channelCount}-${pack.price}-${idx}`}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                      onChange(pack.value);
                      setSearch('');
                      setOpen(false);
                      if (onSelectPack) onSelectPack(pack);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>
                        <span className="font-medium">{pack.label}</span>
                        <span className="text-xs ml-2 text-muted-foreground">{pack.channelCount} ch</span>
                      </span>
                      <Badge variant="outline" className="ml-2">₹{pack.price}</Badge>
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

