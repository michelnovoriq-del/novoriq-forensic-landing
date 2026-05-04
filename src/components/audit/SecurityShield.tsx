import { ShieldCheck } from 'lucide-react';

export const SecurityShield = () => (
  <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
    <ShieldCheck className="w-4 h-4 text-emerald-500" />
    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-[0.16em] font-bold">
      Stateless audit protocol
    </span>
  </div>
);
