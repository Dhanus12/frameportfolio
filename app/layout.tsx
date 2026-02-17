import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dhanus Mani | Full Stack Java Developer",
  description: "Immersive portfolio of Dhanus Mani, a Full Stack Java Developer specializing in Spring Boot and React.",
  keywords: ["Java Developer", "Spring Boot", "React", "Full Stack", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          "antialiased bg-black text-white min-h-screen font-sans"
        )}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
