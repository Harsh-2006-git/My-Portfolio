import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Certificates earned by Harsh Manmode — Postman API Expert, Google Cloud Study Jams, multiple hackathon certificates from IIM Indore, IIIT Gwalior, Amity University, and more.",
  alternates: { canonical: "https://www.harshmanmode.tech/certificates" },
  openGraph: {
    title: "Certificates | Harsh Manmode",
    description:
      "Certifications earned by Harsh Manmode — Postman API Expert, Google Cloud, hackathon certificates from top institutions.",
    url: "https://www.harshmanmode.tech/certificates",
  },
};

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
