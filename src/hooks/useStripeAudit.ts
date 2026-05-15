import { useState } from 'react';
import axios from 'axios';

export type AuditDispute = {
  id: string;
  amountFormatted: string;
  reason: string;
  status: string;
  created: string;
};

export type AuditReport = {
  success: boolean;
  totalLostFormatted: string;
  disputeCount: number;
  disputes: AuditDispute[];
  securityNote: string;
  summary?: {
    reviewedWindow: string;
    nextStep: string;
    processingStandard: string;
  };
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_NOVORIQ_API_URL || 'https://novoriqrevenueosapi.onrender.com';

export const useStripeAudit = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");

  const runAudit = async (key: string) => {
    const stripeSecretKey = key.trim();

    if (!stripeSecretKey) {
      setError("Enter a restricted Stripe key to run the audit.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await axios.post<AuditReport>(`${API_BASE_URL}/api/audit/bleed-report`, {
        stripeSecretKey
      });

      setReport(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError<{ error?: string }>(err)) {
        setError(err.response?.data?.error || "The audit service could not complete the request.");
        return;
      }

      setError("The audit service could not complete the request.");
    } finally {
      setLoading(false);
    }
  };

  return { runAudit, report, loading, error };
};
