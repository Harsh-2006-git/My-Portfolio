import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Harsh Manmode — Full-Stack Developer and student at Madhav Institute of Technology and Science (MITS), Gwalior. Passionate about building impactful software solutions.",
  alternates: { canonical: "https://www.harshmanmode.tech/about" },
  openGraph: {
    title: "About Harsh Manmode | Full-Stack Developer from MITS Gwalior",
    description:
      "Learn about Harsh Manmode — Full-Stack Developer, hackathon champion, and MITS Gwalior student building impactful digital solutions.",
    url: "https://www.harshmanmode.tech/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
