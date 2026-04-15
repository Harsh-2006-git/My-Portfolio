import type { Metadata } from "next";
import {
  Preahvihear,
  Poor_Story,
  Poetsen_One,
  Plus_Jakarta_Sans,
  Poppins,
  Cinzel,
} from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
});

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-preahvihear",
});
const poorStory = Poor_Story({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poor-story",
});
const poetsenOne = Poetsen_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poetsenone",
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-plus-jakarta-sans",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Harsh Manmode | Portfolio",
  description: "A professional portfolio showcasing digital solutions and software engineering excellence.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${preahvihear.variable} ${poorStory.variable} ${poetsenOne.variable} ${plusJakartaSans.variable} ${poppins.variable} ${cinzel.variable}`}
    >
      <body className="antialiased bg-[#000000] text-white overflow-x-hidden font-plusJakartaSans selection:bg-blue-500/30">
        <div className="fixed top-[-5%] left-[-5%] w-[450px] h-[450px] bg-[#0051FF] rounded-full blur-[180px] opacity-[0.12] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-5%] right-[-5%] w-[380px] h-[380px] bg-[#320F85] rounded-full blur-[160px] opacity-[0.1] pointer-events-none z-0"></div>

        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
