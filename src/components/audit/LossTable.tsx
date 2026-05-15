import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { AuditReport } from '../../hooks/useStripeAudit';

export const LossTable = ({ report }: { report: AuditReport | null }) => {
  if (!report) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* TELEMETRY CARDS */}
      <div className="grid gap-px bg-slate-200 sm:grid-cols-3 border border-slate-200">
        <div className="bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Disputed Value
          </p>
          {/* THE REVENUE PULSE */}
          <p className="mt-2 text-3xl font-mono font-bold tabular-nums text-slate-900">
            {report.totalLostFormatted}
          </p>
        </div>
        <div className="bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Disputes Found
          </p>
          <p className="mt-2 text-3xl font-mono font-bold tabular-nums text-slate-900">
            {report.disputeCount}
          </p>
        </div>
        <div className="bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Credential Handling
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs font-mono tracking-widest font-bold text-emerald-400 uppercase">
            <CheckCircle2 className="h-4 w-4" />
            Not stored
          </p>
        </div>
      </div>

      <div className="border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Recent Dispute Review</h2>
            <p className="mt-1 text-[10px] font-mono tracking-widest text-slate-500 uppercase">{report.securityNote}</p>
          </div>
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>

        {report.disputes.length === 0 ? (
          <div className="px-5 py-12 text-center bg-slate-50">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300">No recent disputes found.</p>
            <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-slate-600">
              The audit completed successfully and found no recent disputes in the reviewed Stripe window.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-normal">Dispute ID</th>
                  <th className="px-5 py-4 font-normal">Reason</th>
                  <th className="px-5 py-4 font-normal">Status</th>
                  <th className="px-5 py-4 font-normal">Created</th>
                  <th className="px-5 py-4 font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px] uppercase tracking-widest">
                {report.disputes.map((dispute) => (
                  <tr key={dispute.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="max-w-[190px] truncate px-5 py-4 text-slate-500">{dispute.id}</td>
                    <td className="px-5 py-4 text-slate-400">
                      {dispute.reason.replace(/_/g, ' ')}
                    </td>
                    <td className="px-5 py-4 text-slate-500">{dispute.status}</td>
                    <td className="px-5 py-4 text-slate-600">{dispute.created}</td>
                    {/* THE REVENUE PULSE TRIGGER */}
                    <td className="px-5 py-4 text-right font-bold text-slate-900">
                      {dispute.amountFormatted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Ready For Evidence Review</h3>
          <p className="mt-2 max-w-xl text-[10px] font-mono tracking-widest text-slate-500 uppercase leading-relaxed">
            Open the recovery workspace to connect Stripe, review each dispute, and generate bank-ready evidence documents.
          </p>
        </div>
        <a 
          href="https://novoriqrevenueos.netlify.app/" 
          className="group inline-flex whitespace-nowrap items-center justify-center gap-3 bg-slate-900 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-800"
        >
          Open Recovery Workspace
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </motion.div>
  );
};
