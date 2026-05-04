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
      setError("Enter a Stripe restricted key to run the scan.");
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
        setError(err.response?.data?.error || "Connection to forensic node failed.");
        return;
      }

      setError("Connection to forensic node failed.");
    } finally {
      setLoading(false);
    }
  };

  return { runAudit, report, loading, error };
};
