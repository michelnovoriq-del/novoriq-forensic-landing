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

export const metadata: Metadata = {
  title: "Novoriq | Stripe Dispute Recovery Review",
  description: "Read-only Stripe dispute assessment for SaaS teams. Review recent disputes, identify at-risk revenue, and prepare evidence documents for recovery workflows.",
  keywords: ["Stripe dispute", "chargeback recovery", "revenue recovery", "SaaS dispute management", "Stripe dispute evidence", "Stripe radar score"],
  openGraph: {
    title: "Novoriq | Stripe Dispute Recovery Review",
    description: "Review recent Stripe disputes and prepare the next recovery step.",
    url: "https://novoriqrevenuerecoveryos.netlify.app", 
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="3Ol5qgl_o7B0RxkhTaJsmWwVw1RQsu1N_22dJ8blAmY" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
