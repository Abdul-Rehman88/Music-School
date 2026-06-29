  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import Navbar from "@/components/Navbar";
  import ThemeToggle from "@/components/ThemeToggle";
  import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import Footer from "@/components/Footer";


  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "Sonder Music School",
    description: " A music school for self-expression. Sonder blends personalized instruction with a visually striking, modern web experience that reflects the creativity it teaches.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  suppressHydrationWarning
>
  <head>
    <script dangerouslySetInnerHTML={{
      __html: `
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      `
    }} />
  </head>
  <body className="min-h-full flex flex-col bg-[#f5f4ff] text-black dark:bg-black dark:text-white" suppressHydrationWarning>
    <SmoothScrollProvider>
      <div className="relative w-full flex justify-center items-center">
        <Navbar />
      </div>
      {children}
      <div className="w-full" >
        <Footer/>
      </div>
      <ThemeToggle />
   </SmoothScrollProvider>

  </body>
</html>
    );
  }
