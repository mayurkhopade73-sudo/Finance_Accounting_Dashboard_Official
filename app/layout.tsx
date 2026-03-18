import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./sidebar";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Dashboard | Cognexia.AI",
  description: "CognexiaAI Finance & Accounting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 transition-colors`}>

        <div className="flex h-screen overflow-hidden">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Area */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}