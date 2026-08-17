import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Applied Digital | Casino Night Experience",
  description: "A private Dallas holiday casino night and live poker training proposal prepared for Applied Digital by Las Vegas Poker Training.",
  robots: { index: false, follow: false },
  other: { "theme-color": "#070b16" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
