import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HealthAI — AI Денсаулық Қауіп Анализаторы",
  description:
    "Киімдік құрылғы деректері негізіндегі AI денсаулық аналитикасы. Жүрек, ұйқы, белсенділік деректері арқылы ауру қаупін болжаңыз.",
  keywords: ["денсаулық", "AI", "аналитика", "health", "wearable"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${geistSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
