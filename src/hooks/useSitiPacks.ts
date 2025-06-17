import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SitiPack {
  pack_id: number;
  pack_name: string | null;
  channel_count: number | null;
  deductible_amount: number | null;
  actual_price: number | null;
}

export const useSitiPacks = () => {
  return useQuery({
    queryKey: ['siti-packs'],
    queryFn: async () => {
      console.log('Fetching SITI packs from database...');
      const { data, error } = await supabase
        .from('SITI')
        .select('*')
        .order('pack_name');
      
      if (error) {
        console.error('Error fetching SITI packs:', error);
        throw error;
      }
      
      console.log('Fetched SITI packs:', data);
      return data as SitiPack[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};