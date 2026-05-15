"use client";

import { FormEvent, useState } from 'react';
import { Activity, DatabaseZap, KeyRound, Loader2, Search, ShieldCheck } from 'lucide-react';
import { LossTable } from './LossTable';
import { SecurityShield } from './SecurityShield';
import { useStripeAudit } from '../../hooks/useStripeAudit';

const auditSteps = [
  { label: 'VERIFY READ-ONLY ACCESS', icon: KeyRound },
  { label: 'REVIEW RECENT DISPUTES', icon: Search },
  { label: 'SUMMARIZE AT-RISK VALUE', icon: DatabaseZap },
  { label: 'PREPARE NEXT STEPS', icon: Activity },
];

export const ForensicAuditApp = () => {
  const [inputKey, setInputKey] = useState('');
  const { runAudit, report, loading, error } = useStripeAudit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runAudit(inputKey);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[360px_1fr] lg:px-6">
        
        {/* SIDEBAR COMMAND CENTER */}
        <aside className="border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="flex h-full flex-col">
            
            {/* STATELESS INDICATOR & BRAND */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <h1 className="text-xl font-bold tracking-widest text-slate-900 uppercase">
                  NOVORIQ <span className="text-slate-500">RECOVERY</span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-600">Online</span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500 uppercase tracking-widest">
              Read-only Stripe dispute audit. Review recent disputes and identify where evidence preparation can help.
            </p>

            <div className="mt-6 opacity-80 grayscale">
              <SecurityShield />
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label htmlFor="stripe-key" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Stripe Restricted Key
              </label>
              
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  id="stripe-key"
                  type="password"
                  autoComplete="off"
                  placeholder="rk_live_..."
                  value={inputKey}
                  onChange={(event) => setInputKey(event.target.value)}
                  className="h-12 w-full border border-slate-300 bg-white pl-10 pr-3 font-mono text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div className="mt-3 border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Recommended key setup
                </p>
                <ol className="list-decimal pl-4 text-[10px] leading-relaxed tracking-widest text-slate-500 space-y-1">
                  <li>Open Stripe &gt; Developers &gt; API Keys.</li>
                  <li>Click <span className="text-slate-300">Create Restricted Key</span>.</li>
                  <li>Set <span className="text-slate-300">Disputes</span> permission to <span className="text-emerald-400">READ</span>.</li>
                  <li>Leave all other permissions blank.</li>
                  <li>Paste the <span className="text-slate-300">rk_live_...</span> key above.</li>
                </ol>
              </div>

              <button
                type="submit"
                disabled={loading || !inputKey.trim()}
                className="flex h-14 w-full items-center justify-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                {loading ? 'Reviewing Stripe disputes' : 'Run Free Audit'}
              </button>
              {error && (
                <p className="border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-8 space-y-2">
              {auditSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-3 border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[10px] font-bold text-slate-600">
                      0{index + 1}
                    </div>
                    <Icon className="h-3 w-3 text-slate-600" />
                    <span className="text-[10px] font-bold tracking-widest text-slate-400">{step.label}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-auto pt-8 text-[10px] uppercase tracking-widest leading-5 text-slate-500">
              Restricted keys are used for this audit request only and are not saved by the free audit workflow.
            </p>
          </div>
        </aside>

        {/* MAIN REVIEW AREA */}
        <section className="flex min-h-[calc(100vh-2rem)] flex-col gap-6">
          <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  Free audit
                </p>
                <h2 className="mt-3 max-w-3xl text-2xl font-normal tracking-wide text-slate-900 uppercase md:text-4xl">
                  Stripe dispute <span className="font-bold">recovery assessment</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-px bg-slate-200 sm:min-w-[340px] border border-slate-200">
                <div className="bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Review window
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">Latest 50</p>
                </div>
                <div className="bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    STATUS
                  </p>
                  <p className="mt-2 text-xl font-bold text-emerald-600">{loading ? 'Reviewing' : report ? 'Complete' : 'Ready'}</p>
                </div>
              </div>
            </div>
          </div>

          {report ? (
            <LossTable report={report} />
          ) : (
            <div className="grid flex-1 gap-6 xl:grid-cols-[1fr_320px]">
              <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-8">
                <div className="grid h-full place-items-center border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-slate-200 bg-white">
                      <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <h3 className="mt-6 text-sm font-bold tracking-widest uppercase text-slate-700">Ready to review</h3>
                    <p className="mt-3 text-xs leading-6 tracking-widest text-slate-600 uppercase">
                      Enter a read-only restricted key to review your latest dispute activity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-3">
                    Audit output
                  </p>
                  <ul className="mt-4 space-y-3 text-[10px] uppercase tracking-widest text-slate-400">
                    <li>Total disputed amount</li>
                    <li>Reason codes and status</li>
                    <li>Recent dispute ledger</li>
                    <li>Recommended recovery step</li>
                  </ul>
                </div>
                <div className="border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 border-b border-slate-800 pb-3">
                    Credential handling
                  </p>
                  <p className="mt-4 text-[10px] uppercase tracking-widest leading-5 text-slate-500">
                    The free audit uses a restricted key for read-only dispute retrieval and does not store the key.
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
