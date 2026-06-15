import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find My Nest",
  description: "Find your perfect rental home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
