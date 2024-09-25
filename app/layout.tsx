import type { Metadata } from "next";
import "./globals.css";
import AuthOverlay from "@/app/components/AuthOverlay";

export const metadata: Metadata = {
  title: "Tiktok Clone | Dharma Wiguna",
  description: "Tiktok Clone nextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthOverlay />
      <body>{children}</body>
    </html>
  );
}
