import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOSTT — Chai, snacks & good company",
  description:
    "Your neighbourhood adda in Dadri for kulhad chai, comfort food and conversations that last a little longer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
