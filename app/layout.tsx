import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Header from "@/components/header";
import "./globals.css";

const _geistSans = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find My Nest",
  description: "Find your perfect rental home",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
