
export interface Recharge {
  id: number;
  customer: string;
  service: string;
  pack: string;
  amount: number;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface NewRecharge {
  customer: string;
  service: string;
  company: string;
  pack: string;
  amount: number;
}
