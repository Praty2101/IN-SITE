
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Pack } from '@/data/packData';

export const useGtplTvPacks = () => {
  const { data: packs, isLoading: loading, error } = useQuery({
    queryKey: ['gtpl-tv-packs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gtpl_tv_packs')
        .select('*')
        .order('customer_price', { ascending: true });

      if (error) {
        console.error('Error fetching GTPL TV packs:', error);
        throw error;
      }

      // Transform database data to Pack format
      const transformedPacks: Pack[] = data.map(pack => ({
        label: pack.pack_name,
        value: `gtpl-tv-${pack.id}`,
        channelCount: pack.channel_count,
        operatorPrice: Number(pack.operator_price),
        customerPrice: Number(pack.customer_price)
      }));

      return transformedPacks;
    },
  });

  return { packs: packs || [], loading, error };
};
