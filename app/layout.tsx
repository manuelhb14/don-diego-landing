import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Diego Club Residencial — San Miguel de Allende",
  description: "Club residencial en San Miguel de Allende con tierra, agua, bienestar y vida en comunidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
