import { NextResponse } from "next/server";

export async function GET() {
  const projects = [
    {
      id: 1,
      name: "Alumni Engagements Platform",
      description: "Networking platform supporting 1,000+ users with real-time chat and post-management.",
      longDescription: "A massive networking solution for alumni communities. Features include a detailed admin dashboard, JWT-based security with Google OAuth 2.0, real-time messaging using Socket.io, and a post management system to keep the community engaged.",
      photos: [
        "/projects/1.1.jpg",
        "/projects/1.2.jpg",
        "/projects/1.3.jpg",
        "/projects/1.4.jpg",
        "/projects/1.5.jpg",
        "/projects/1.6.jpg",
        "/projects/1.7.jpg",
        "/projects/1.8.jpg",
        "/projects/1.9.jpg",
        "/projects/1.10.jpg",
        "/projects/1.11.jpg",
        "/projects/1.12.jpg"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      gitHubLink: "https://github.com/Harsh-2006-git/alumni-platform",
      liveLink: "#",
      category: "Full Stack Web"
    },
    {
      id: 2,
      name: "Travel Booking Platform",
      description: "Geo-location booking platform with verified reviews and room management.",
      longDescription: "Designed an interactive booking system with integrated geo-location maps. Engineered a custom search algorithm that improved booking completion by 38% and built a trust-focused review system for verified accommodations.",
      photos: [
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "/logo3.png",
        "/mits-logo.png"
      ],
      techStack: ["Node.JS", "Express.JS", "MongoDB", "EJS", "Tailwind CSS"],
      gitHubLink: "https://github.com/Harsh-2006-git/travel-booking",
      liveLink: "#",
      category: "Web Application"
    }
  ];

  return NextResponse.json(projects);
}
