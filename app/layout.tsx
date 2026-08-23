import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobair-hossain.github.io/Q-Data/"),
  title: "Q-Data | Quantum-Ready Cybersecurity Datasets",
  description:
  "A proposed NSF AI Datasets Planning project to architect and test a reusable Q-Data pipeline for reproducible quantum-ready cybersecurity data products.",
  keywords: [
    "Q-Data",
    "quantum-ready datasets",
    "quantum machine learning",
    "cybersecurity",
    "NSF AI Datasets",
    "TrojAI",
    "EMBER2024",
  ],
  openGraph: {
    title: "Q-Data | Quantum-Ready Cybersecurity Datasets",
    description:
      "A proposed NSF Planning project to architect a reusable Q-Data pipeline connecting authoritative cybersecurity datasets to reproducible quantum and hybrid AI workflows.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Q-Data quantum-ready cybersecurity datasets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Q-Data | Quantum-Ready Cybersecurity Datasets",
    description:
        "A proposed NSF Planning project for a reusable Q-Data pipeline and quantum-ready cybersecurity data products.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
