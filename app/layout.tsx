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

const BASE_URL = "https://www.harshmanmode.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Harsh Manmode | Full-Stack Developer & Software Engineer",
    template: "%s | Harsh Manmode",
  },

  description:
    "Harsh Manmode — Full-Stack Developer from MITS Gwalior (Madhav Institute of Technology and Science). Hackathon winner, MITS Alumni Portal creator, and software engineer specializing in React, Node.js, and MongoDB.",

  keywords: [
    "Harsh Manmode",
    "Harsh",
    "harsh manmode",
    "harsh from MITS",
    "harsh MITS",
    "harsh MITS Gwalior",
    "Harsh Manmode portfolio",
    "Harsh Manmode developer",
    "Harsh Manmode full stack",
    "Harsh Manmode MITS",
    "Harsh Manmode Gwalior",
    "MITS Gwalior developer",
    "Madhav Institute of Technology student developer",
    "full stack developer MITS",
    "full stack developer Gwalior",
    "MERN stack developer",
    "hackathon winner MITS",
    "HackSetu winner",
    "MITS Alumni Portal",
    "software engineer India",
    "React developer India",
    "Node.js developer",
    "portfolio Harsh",
    "Harsh developer portfolio",
  ],

  authors: [{ name: "Harsh Manmode", url: BASE_URL }],
  creator: "Harsh Manmode",
  publisher: "Harsh Manmode",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Harsh Manmode | Portfolio",
    title: "Harsh Manmode | Full-Stack Developer from MITS Gwalior",
    description:
      "Harsh Manmode — Full-Stack Developer from MITS Gwalior. Hackathon winner, creator of MITS Alumni Portal, building impactful digital solutions with React, Node.js & MongoDB.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Manmode — Full-Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Harsh Manmode | Full-Stack Developer from MITS Gwalior",
    description:
      "Harsh Manmode — Full-Stack Developer from MITS Gwalior. Hackathon winner, creator of MITS Alumni Portal.",
    images: ["/og-image.png"],
    creator: "@harshmanmode",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },

  verification: {
    google: "qd9gXA_heDqopt22autE6UkN3gnBPIek-1G2FAd_bjg",
  },

  category: "technology",
};

// JSON-LD Structured Data — Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Manmode",
  url: BASE_URL,
  image: `${BASE_URL}/favicon.png`,
  sameAs: [
    "https://github.com/Harsh-2006-git",
    "https://www.linkedin.com/in/harsh-manmode",
  ],
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "EducationalOrganization",
    name: "Madhav Institute of Technology and Science (MITS), Gwalior",
    url: "https://www.mitsgwalior.in",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "MITS Gwalior",
  },
  knowsAbout: [
    "React.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Next.js",
    "Full-Stack Development",
    "MERN Stack",
    "Socket.IO",
    "JavaScript",
    "TypeScript",
  ],
  description:
    "Harsh Manmode is a Full-Stack Developer from Madhav Institute of Technology and Science (MITS), Gwalior. He is a hackathon winner (HackSetu 1.0, Technocrats Innovation Challenge), creator of the official MITS Alumni Portal, and recipient of the MITS Meritocracy Award 2026.",
  award: [
    "HackSetu 1.0 Winner — National Level Hackathon, Amity University Gwalior",
    "1st Runner-Up — Technocrats Innovation Challenge 2K26",
    "Meritocracy Award — MITS Day 2026",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#000000] text-white overflow-x-hidden font-plusJakartaSans selection:bg-blue-500/30">
        <div className="fixed top-[-5%] left-[-5%] w-[450px] h-[450px] bg-[#0051FF] rounded-full blur-[180px] opacity-[0.12] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-5%] right-[-5%] w-[380px] h-[380px] bg-[#320F85] rounded-full blur-[160px] opacity-[0.1] pointer-events-none z-0"></div>

        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
