import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Harsh Manmode — React.js, Node.js, MongoDB, Express.js, Next.js, Socket.IO, Python, TypeScript, and more. Full-Stack MERN developer from MITS Gwalior.",
  alternates: { canonical: "https://www.harshmanmode.tech/skills" },
  openGraph: {
    title: "Skills | Harsh Manmode",
    description:
      "Technical skills of Harsh Manmode — React, Node.js, MongoDB, Next.js, TypeScript, and full-stack development expertise.",
    url: "https://www.harshmanmode.tech/skills",
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
