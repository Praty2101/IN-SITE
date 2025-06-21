
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Pack } from '@/data/packData';

interface SitiPackDB {
  id: number;
  pack_name: string;
  channel_count: number;
  operator_price: number;
  customer_price: number;
}

export const useSitiPacks = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSitiPacks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('siti_packs')
          .select('*')
          .order('customer_price', { ascending: true });

        if (error) {
          throw error;
        }

        const formattedPacks: Pack[] = data?.map((pack: SitiPackDB) => ({
          label: pack.pack_name,
          value: pack.pack_name,
          channelCount: pack.channel_count,
          operatorPrice: pack.operator_price,
          customerPrice: pack.customer_price
        })) || [];

        setPacks(formattedPacks);
      } catch (err) {
        console.error('Error fetching SITI packs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch SITI packs');
      } finally {
        setLoading(false);
      }
    };

    fetchSitiPacks();
  }, []);

  return { packs, loading, error };
};
