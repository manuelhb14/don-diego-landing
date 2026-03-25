import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Don Diego Club Residencial — San Miguel de Allende",
  description: "Desarrollo residencial de lujo en San Miguel de Allende.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
