import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The $100M Narrative Metadata - Forces Google to index you as a pre-emptive security engine.
export const metadata: Metadata = {
  title: "Novoriq | Pre-Emptive Stripe Dispute Forensics",
  description: "Autonomous dispute intelligence for SaaS. Capture cryptographic telemetry (IP, AVS, Radar) at checkout and compile evidence dossiers before disputes happen.",
  keywords: ["Stripe dispute", "chargeback recovery", "revenue leakage", "SaaS dispute management", "payment forensics", "Stripe radar score"],
  openGraph: {
    title: "Novoriq | Autonomous Dispute Assessment",
    description: "Find and recover dispute leakage before it becomes invisible.",
    url: "https://YOUR-LIVE-NETLIFY-URL.app", // IMPORTANT: Update this to your live URL
    siteName: "Novoriq",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Drop your Google Search Console HTML verification tag right below this line later */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> */}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}