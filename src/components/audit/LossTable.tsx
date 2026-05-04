import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { AuditReport } from '../../hooks/useStripeAudit';

export const LossTable = ({ report }: { report: AuditReport | null }) => {
  if (!report) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border border-red-400/30 bg-red-500/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-200">
            Revenue exposed
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums text-red-100">
            {report.totalLostFormatted}
          </p>
        </div>
        <div className="border border-slate-700 bg-slate-950/70 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Disputes found
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums text-white">
            {report.disputeCount}
          </p>
        </div>
        <div className="border border-emerald-400/30 bg-emerald-500/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
            Key handling
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-100">
            <CheckCircle2 className="h-4 w-4" />
            Stateless scan
          </p>
        </div>
      </div>

      <div className="border border-slate-800 bg-slate-950/70">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div>
            <h2 className="text-sm font-bold text-white">Dispute Ledger</h2>
            <p className="mt-1 text-xs text-slate-500">{report.securityNote}</p>
          </div>
          <AlertTriangle className="h-5 w-5 text-red-300" />
        </div>

        {report.disputes.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-semibold text-white">No recent disputes found.</p>
            <p className="mt-2 text-sm text-slate-500">
              The scan completed successfully and did not find leakage in the latest Stripe dispute window.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-slate-900 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Forensic ID</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Leakage</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                {report.disputes.map((dispute) => (
                  <tr key={dispute.id} className="border-t border-slate-800/80 hover:bg-red-500/5">
                    <td className="max-w-[190px] truncate px-4 py-3 text-slate-500">{dispute.id}</td>
                    <td className="px-4 py-3 text-slate-300 uppercase">
                      {dispute.reason.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3 text-slate-400 uppercase">{dispute.status}</td>
                    <td className="px-4 py-3 text-slate-500">{dispute.created}</td>
                    <td className="px-4 py-3 text-right font-bold text-red-300">
                      {dispute.amountFormatted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="border border-blue-400/30 bg-blue-500/10 p-5">
        <h3 className="text-lg font-bold text-white">Recovery engine ready</h3>
        <p className="mt-2 max-w-2xl text-sm text-blue-100/75">
          Novoriq Revenue OS can turn this audit into automated evidence generation and recovery workflows.
        </p>
        <a 
          href="https://novoriqrevenueos.netlify.app/" 
          className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-black text-blue-700 transition-colors hover:bg-blue-50"
        >
          Open Revenue OS
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};
