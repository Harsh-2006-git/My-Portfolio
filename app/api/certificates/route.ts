import { NextResponse } from "next/server";

export async function GET() {
  const certificates = [
    {
      id: 1,
      title: "Hacksetu 1.0 Hackathon",
      issuer: "Amity University Gwalior",
      description: "### Winning 1st Prize at HackSetu 1.0\n\nThrilled to share that my team won **1st Prize 🏆** at **HackSetu 1.0** – a National Level 24 hour's Hackathon organized by Amity University, Gwalior.\n\nOut of **600+ teams** from across the country, only **60 teams** made it to the final offline round, and just **6 teams** were shortlisted to present their ideas on stage.\n\nFrom those, the top 3 teams were selected — and we’re incredibly proud to have secured the **1st position! 🎉**\n\n**Our Project:** Smart Pilgrim Assistant System\n**Goal:** Making pilgrim journeys smarter, safer, and more accessible through technology-driven solutions.\n**Team Name:** Team Manthan\n\nThis journey was an amazing learning experience filled with innovation, teamwork, and sleepless nights — but totally worth it!",
      date: "November 2025",
      images: ["/certificates/Hacksetu.jpg"],
      link: "#"
    },
    {
      id: 5,
      title: "Code Coalescence Hackathon",
      issuer: "MITS Gwalior",
      description: "Achieved **recognition** in the **Code-o-Scene** coding competition for efficient algorithm design and rapid problem-solving capabilities.",
      date: "February 2025",
      images: ["/certificates/Codecolescene.jpg"],
      link: "#"
    },
    {
      id: 6,
      title: "Meritocracy Award",
      issuer: "MITS Gwalior",
      description: "Honored to be Recognized on MITS Day 2026 at **Madhav Institute of Technology and Science**, Gwalior for Winning the **Meritocracy Award** for winning 1st prize in Hacksetu 1.0 Hackathon.",
      date: "March 2026",
      images: ["/certificates/Meritocracy.jpg"],
      link: "#"
    },
    {
      id: 13,
      title: "Devscript Hackathon",
      issuer: "GDG MITS Gwalior Community",
      description: "Secured the **2nd Runner Up** position in the **Devscript Hackathon**, organized by the **GDG MITS Gwalior Community**. This achievement reflects successful collaboration and innovative problem-solving in a competitive hackathon environment.",
      date: "April 2026",
      images: ["/certificates/1775073917717.jpg"],
      link: "#"
    },
    {
      id: 14,
      title: "Technocrats Innovation Challenge Hackathon 2k26",
      issuer: "TIT Bhopal College",
      description: "Secured the **1st Runner Up** position in the **Technocrats Innovation Challenge 2k26**, organized by **TIT Bhopal**. This event brought together innovators from across India (300+ teams) to build working solutions in a 36-hour continuous hackathon.",
      date: "March 2026",
      images: ["/certificates/Technocrats-certificate.jpg"],
      link: "#"
    },
    {
      id: 11,
      title: "Mediverse Hackathon",
      issuer: "Medicaps University Indore",
      description: "9th rank in the **Mediverse hackathon**, developing technology-driven solutions to improve healthcare accessibility and patient outcomes.",
      date: "November 2025",
      images: ["/certificates/mediverse.jpg"],
      link: "#"
    },
    {
      id: 9,
      title: "Codeverse Certification",
      issuer: "Codeverse",
      description: "Engaged in **specialized training** and competition at **Codeverse**, focusing on cutting-edge technologies and collaborative software architecture.",
      date: "October 2025",
      images: ["/certificates/codeverse.jpg"],
      link: "#"
    },
    {
      id: 3,
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      description: "Successfully completed the **Postman API Fundamentals Student Expert** certification, demonstrating proficiency in working with APIs, sending requests, and understanding REST principles.",
      date: "July 2025",
      images: ["/certificates/postman.jpg"],
      link: "#"
    },
    {
      id: 2,
      title: "Google Solution Challenge 2024",
      issuer: "Google Developers",
      description: "Participation in the **Google Solution Challenge**, working on innovative solutions to address global problems and leveraging Google technologies for social impact.",
      date: "March 2025",
      images: ["/certificates/solutionchalenge.jpg"],
      link: "#"
    },
    {
      id: 4,
      title: "Hackwise Achievement",
      issuer: "IIM Indore",
      description: "Successfully participated in **Hackwise**, demonstrating technical prowess and collaborative problem-solving skills in a high-pressure environment.",
      date: "February 2026",
      images: ["/certificates/Hackwise.jpg"],
      link: "#"
    },
    {
      id: 12,
      title: "Hacksagon Hackathon 2026",
      issuer: "IIIT Gwalior",
      description: "Selected for the final round in **Hacksagon Hackathon 2026**, demonstrating technical prowess and collaborative problem-solving skills in a high-pressure environment.",
      date: "February 2026",
      images: ["/certificates/hacksagon.png"],
      link: "#"
    },
    {
      id: 7,
      title: "Google Cloud Study Jams",
      issuer: "Google Cloud",
      description: "Participated and excelled in the **Google Cloud Study Jams**, mastering cloud infrastructure and deployment strategies through hands-on challenges.",
      date: "October 2025",
      images: ["/certificates/cloudgames.jpg"],
      link: "#"
    },
    {
      id: 8,
      title: "Codathon Participant",
      issuer: "MITS Gwalior",
      description: "Successfully competed in the **Codathon event**, showcasing advanced programming skills DSA in Java and logical reasoning across multiple development tracks.",
      date: "February 2026",
      images: ["/certificates/codathon.png"],
      link: "#"
    },
    {
      id: 10,
      title: "GDG Community Recognition",
      issuer: "Google Developer Groups",
      description: "Commended for active participation and technical contributions within the **Google Developer Group** community and events.",
      date: "October 2025",
      images: ["/certificates/gdg.jpg"],
      link: "#"
    },

  ];

  return NextResponse.json(certificates);
}
