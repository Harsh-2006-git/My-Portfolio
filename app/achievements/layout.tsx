import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Achievements of Harsh Manmode — Winner of HackSetu 1.0 National Hackathon, 1st Runner-Up at Technocrats Innovation Challenge 2K26, Meritocracy Award from MITS Gwalior 2026.",
  alternates: { canonical: "https://www.harshmanmode.tech/achievements" },
  openGraph: {
    title: "Achievements | Harsh Manmode",
    description:
      "Harsh Manmode's achievements: HackSetu 1.0 Winner, Technocrats 1st Runner-Up, MITS Meritocracy Award 2026.",
    url: "https://www.harshmanmode.tech/achievements",
  },
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
