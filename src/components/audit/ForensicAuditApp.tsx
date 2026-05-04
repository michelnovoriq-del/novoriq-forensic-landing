"use client";

import { FormEvent, useState } from 'react';
import { Activity, DatabaseZap, KeyRound, Loader2, Search, ShieldCheck } from 'lucide-react';
import { LossTable } from './LossTable';
import { SecurityShield } from './SecurityShield';
import { useStripeAudit } from '../../hooks/useStripeAudit';

const auditSteps = [
  { label: 'Authenticate restricted key', icon: KeyRound },
  { label: 'Read latest Stripe disputes', icon: Search },
  { label: 'Calculate exposed revenue', icon: DatabaseZap },
  { label: 'Prepare recovery briefing', icon: Activity },
];

export const ForensicAuditApp = () => {
  const [inputKey, setInputKey] = useState('');
  const { runAudit, report, loading, error } = useStripeAudit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runAudit(inputKey);
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[360px_1fr] lg:px-6">
        <aside className="border border-slate-800 bg-slate-950/80 p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-300">
                  Novoriq
                </p>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Forensic Audit Console
                </h1>
              </div>
              <div className="flex h-11 w-11 items-center justify-center border border-blue-400/30 bg-blue-500/10">
                <ShieldCheck className="h-5 w-5 text-blue-200" />
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Run a stateless Stripe dispute audit and expose unrecovered revenue from the latest dispute window.
            </p>

            <div className="mt-6">
              <SecurityShield />
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <label htmlFor="stripe-key" className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Stripe restricted key
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="stripe-key"
                  type="password"
                  autoComplete="off"
                  placeholder="rk_live_..."
                  value={inputKey}
                  onChange={(event) => setInputKey(event.target.value)}
                  className="h-12 w-full border border-slate-800 bg-black pl-10 pr-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-slate-700 focus:border-blue-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !inputKey.trim()}
                className="flex h-12 w-full items-center justify-center gap-2 bg-white px-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {loading ? 'Scanning' : 'Run Audit'}
              </button>
              {error && (
                <p className="border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-8 space-y-3">
              {auditSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-3 border border-slate-800 bg-slate-900/40 p-3">
                    <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-xs font-black text-slate-500">
                      {index + 1}
                    </div>
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-300">{step.label}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-auto pt-8 text-xs leading-5 text-slate-600">
              Keys are sent directly to the audit endpoint for in-memory Stripe retrieval. They are not stored by the forensic scan endpoint.
            </p>
          </div>
        </aside>

        <section className="flex min-h-[calc(100vh-2rem)] flex-col gap-6">
          <div className="border border-slate-800 bg-slate-950/60 p-5 md:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Live recovery assessment
                </p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
                  Find dispute leakage before it becomes invisible.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-[340px]">
                <div className="border border-slate-800 bg-black p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Scan depth
                  </p>
                  <p className="mt-2 text-2xl font-black">50</p>
                </div>
                <div className="border border-slate-800 bg-black p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Mode
                  </p>
                  <p className="mt-2 text-2xl font-black">Live</p>
                </div>
              </div>
            </div>
          </div>

          {report ? (
            <LossTable report={report} />
          ) : (
            <div className="grid flex-1 gap-6 xl:grid-cols-[1fr_320px]">
              <div className="border border-slate-800 bg-slate-950/50 p-5 md:p-8">
                <div className="grid h-full place-items-center border border-dashed border-slate-800 bg-black/30 p-8 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-blue-400/30 bg-blue-500/10">
                      <Search className="h-6 w-6 text-blue-200" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">Awaiting audit key</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Enter a restricted Stripe key with dispute read access to populate the revenue exposure table.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-slate-800 bg-slate-950/70 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Expected output
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>Total exposed dispute value</li>
                    <li>Reason codes and dispute status</li>
                    <li>Timestamped latest dispute ledger</li>
                    <li>Recovery engine handoff</li>
                  </ul>
                </div>
                <div className="border border-emerald-400/30 bg-emerald-500/10 p-5">
                  <p className="text-sm font-bold text-emerald-100">Security posture</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                    The scan uses your key only for the audit request and displays Stripe dispute metadata back in this console.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
