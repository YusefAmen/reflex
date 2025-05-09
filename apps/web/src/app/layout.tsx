"use client";

import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Layers,
  BarChart2,
  MessageSquare,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reflex - Observability Dashboard",
  description: "Modern observability platform for your applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: "Projects", href: "/", icon: <Layers className="h-5 w-5" /> },
    { name: "Logs", href: "/1/logs", icon: <BarChart2 className="h-5 w-5" /> },
    {
      name: "Complaints",
      href: "/1/complaints",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Reactions",
      href: "/1/reactions",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: "Billing",
      href: "/billing",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Script src="https://api.tempo.new/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={`${inter.className} bg-neutral-950 text-neutral-200`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex-shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-neutral-800">
              <span className="text-xl font-bold">Reflex</span>
            </div>
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-md text-sm ${isActive ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <div className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-end px-6">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <span className="mr-2">user@example.com</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg py-1 z-10">
                    <button className="flex w-full items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </button>
                    <div className="border-t border-neutral-800 my-1"></div>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Page content */}
            <main className="flex-1 overflow-auto p-8">{children}</main>
          </div>
        </div>
        <TempoInit />
      </body>
    </html>
  );
}
