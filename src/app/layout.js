"use client";

import "./globals.css";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isChatbotPage = pathname === "/chatbot";

  return (
    <html lang="en">
      <body>
        {!isChatbotPage && <Header />}
        <main>{children}</main>
      </body>
    </html>
  );
}
