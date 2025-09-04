import type React from "react";
import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./app-store/provider";
import { Navbar } from "./components/navbar";
import AppInitializer from "./components/app-initializer";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevBlog - Share Your Developer Journey",
  description:
    "A platform for developers to share knowledge and experiences through blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} antialiased pt-20`}>
        <ReduxProvider>
          <AppInitializer>
            <Navbar />
            {children}
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
