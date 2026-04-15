import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Harsh Manmode — Full-Stack Developer from MITS Gwalior. Available for projects, collaborations, and opportunities.",
  alternates: { canonical: "https://www.harshmanmode.tech/contact" },
  openGraph: {
    title: "Contact Harsh Manmode",
    description:
      "Contact Harsh Manmode — Full-Stack Developer from MITS Gwalior. Open for collaborations and opportunities.",
    url: "https://www.harshmanmode.tech/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
