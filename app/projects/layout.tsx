import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Harsh Manmode — full-stack developer from MITS Gwalior. Including MITS Alumni Portal, AI-powered hackathon projects, MERN stack applications, and more.",
  alternates: { canonical: "https://www.harshmanmode.tech/projects" },
  openGraph: {
    title: "Projects | Harsh Manmode",
    description:
      "Projects built by Harsh Manmode — MITS Alumni Portal, Geo-Location Booking Platform, Divya Yatra AI, and more.",
    url: "https://www.harshmanmode.tech/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
