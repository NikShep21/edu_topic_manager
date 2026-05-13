import type { Metadata } from "next";
import "@/styles/globals.scss";
import "@/styles/reset.scss";
import { AppProviders } from "@/app/_providers/AppProviders";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "edu topic manager",
  description: "system for managing student topics in educational institutions",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};
export default RootLayout;
