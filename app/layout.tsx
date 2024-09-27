import type { Metadata } from "next";
import AllOverlay from "./components/AllOverlay";
import UserProvider from "./context/user";
import "./globals.css";

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
      <UserProvider>
        <body>
          <AllOverlay />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
