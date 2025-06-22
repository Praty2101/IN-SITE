
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Pack } from '@/data/packData';

interface AlliancePlanDB {
  id: number;
  plan_name: string;
  speed: string;
  ott_apps_included: string | null;
  validity_days: number;
  base_price: number;
  price_with_gst: number;
}

export const useAlliancePlans = () => {
  const [plans, setPlans] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlliancePlans = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('alliance_plans')
          .select('*')
          .order('base_price', { ascending: true });

        if (error) {
          throw error;
        }

        const formattedPlans: Pack[] = data?.map((plan: AlliancePlanDB) => ({
          label: `${plan.plan_name} (${plan.speed} - ${plan.validity_days}d)`,
          value: plan.plan_name,
          channelCount: 0, // Not applicable for broadband
          operatorPrice: plan.base_price,
          customerPrice: plan.price_with_gst
        })) || [];

        setPlans(formattedPlans);
      } catch (err) {
        console.error('Error fetching Alliance plans:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch Alliance plans');
      } finally {
        setLoading(false);
      }
    };

    fetchAlliancePlans();
  }, []);

  return { plans, loading, error };
};
