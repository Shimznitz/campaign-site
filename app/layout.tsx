// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import { CAMPAIGN } from "@/lib/config";

export const metadata: Metadata = {
  title: `${CAMPAIGN.candidate.name} for ${CAMPAIGN.candidate.state} Governor`,
  description: `${CAMPAIGN.candidate.quote} — Join the movement for a better ${CAMPAIGN.candidate.state}.`,
  keywords: ["governor", "taraba", "election", "campaign", "nigeria", CAMPAIGN.candidate.name],
  openGraph: {
    title: `${CAMPAIGN.candidate.name} for Governor`,
    description: CAMPAIGN.candidate.quote,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}