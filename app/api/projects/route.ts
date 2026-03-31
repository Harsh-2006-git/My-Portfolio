import { NextResponse } from "next/server";

export async function GET() {
  const projects = [
    {
      id: 1,
      name: "Alumni Engagements Networking Platform",
      description: "Networking platform supporting 1,000+ users with real-time chat and post-management.",
      longDescription: "Built an alumni networking platform supporting 1,000+ users with real-time chat and mentorship matching features.\n\n• Developed a full-featured admin dashboard for complete management and deployed on the college’s official domain.\n• Implemented JWT-based Google OAuth 2.0 authentication to enable secure and seamless user sign-in.\n• Architected a Socket.IO–based real-time messaging system for instant, scalable communication.\n• Built an Alumni Association Platform with event management, fundraising, job postings, blogging, mentorship, networking, and profile management, increasing user engagement by 65%.",
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
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "GeminiAPI", "Tailwind CSS"],
      gitHubLink: "https://github.com/Harsh-2006-git/alumni-platform",
      liveLink: "#",
      category: "Full Stack Web"
    },
    {
      id: 2,
      name: "Travel Accommodation Platform",
      description: "Geo-location booking platform with verified reviews and room management.",
      longDescription: "Designed and developed a geo-location-based booking platform.\n\n• Engineered algorithm improving booking completion by 38% with 4.8/5 user satisfaction.\n• Developed a verified review system with authenticity checks to eliminate fake feedback and build users’ trust.\n• Integrated interactive geo map feature allowing users to discover nearby accommodation with engagement by 43%.\n• Implemented a robust transaction system with multi-factor authentication, ensuring secure payments and achieving 99.9% uptime in simulated environments.",
      photos: [
        "/projects/2.1.png",
        "/projects/2.2.png",
        "/projects/2.3.png",
        "/projects/2.4.png",
        "/projects/2.5.png"
      ],
      techStack: ["Embeded.JS", "MongoDB", "Node.JS", "Express.JS", "EJS", "Tailwind CSS"],
      gitHubLink: "https://github.com/Harsh-2006-git/travel-booking",
      liveLink: "#",
      category: "Web Application"
    },
    {
      id: 3,
      name: "Divya Yatra – AI-Powered Pilgrimage Management",
      description: "An AI-powered smart pilgrimage management platform designed for Simhastha 2028.",
      longDescription: "Divya Yatra is an AI-powered smart pilgrimage management platform designed for Simhastha 2028. The system focuses on smart mobility, crowd intelligence, safety, and digital engagement for pilgrims.\n\n✨ Key Features:\n• Smart Crowd Management: AI-based CCTV heatmaps for real-time crowd monitoring.\n• AI Lost & Found: Face, image, and text matching using Google Gemini.\n• Smart Navigation: Live maps (Leaflet.js) with crowd-aware alternate routes.\n• Priority Ticketing: Tiered access, QR/face-based entry, and overload prevention.\n• Real-Time Alerts: Dynamic notices, weather, and emergency notifications.\n• Inclusive Access: Dedicated routes and UI for elderly and Divyangjan.\n\n☁️ Google Technologies Used:\n• Google Gemini AI & Vision API for crowd analytics and matching.\n• Google Cloud Platform for scalable backend & AI workloads.\n• Google Maps & Firebase for navigation, auth, and notifications.",
      photos: [
        "/projects/3.1.png",
        "/projects/3.2.png",
        "/projects/3.3.png",
        "/projects/3.4.png",
        "/projects/3.5.png",
        "/projects/3.6.png",
        "/projects/3.7.png",
        "/projects/3.8.png",
        "/projects/3.9.png",
        "/projects/3.10.png",
        "/projects/3.11.png"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "Leaflet.js", "Socket.IO", "Firebase", "Google Gemini", "Python", "OpenCV"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "https://divya-yatra-devsprint-17xh.vercel.app/",
      category: "AI & Smart City"
    },
    {
      id: 4,
      name: "Macro - Employee Payroll & Leave Management System",
      description: "A production-ready MERN application for payroll processing, leave management, and employee analytics.",
      longDescription: "Macro is a production-ready MERN stack application designed for enterprise workforce management. It features comprehensive payroll processing, leave management, and deep employee analytics.\n\n🔐 Authentication & Security:\n• Google OAuth 2.0 & JWT-based session management.\n• RBAC (Role-Based Access Control) for Admins and Employees.\n\n👤 Admin Capabilities:\n• Employee CRUD & Salary Structure Management.\n• Leave Control with automated balance updates.\n• Payroll Automation (tax, PF, and unpaid leave deductions).\n• Digital Payslips (PDF generation) and automated email delivery.\n\n👨‍💼 Employee Features:\n• Personal Dashboard for leave balances and profile status.\n• Simple leave application with real-time validation.\n• Financial history with downloadable historical payslips.",
      photos: [
        "/projects/4.1.png",
        "/projects/4.2.png",
        "/projects/4.3.png",
        "/projects/4.4.png",
        "/projects/4.5.png",
        "/projects/4.6.png",
        "/projects/4.7.png",
        "/projects/4.8.png",
        "/projects/4.9.png",
        "/projects/4.10.png"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Framer Motion", "Recharts", "Passport.js", "PDFKit", "Nodemailer"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "#",
      category: "Enterprise Software"
    },
    {
      id: 5,
      name: "Real-time Chat Application",
      description: "A modern chat app built with Next.js, Socket.io, and MongoDB, optimized for single-port deployment.",
      longDescription: "A modern, real-time chat application featuring a unified single-port architecture for seamless deployment on Vercel.\n\n✨ Features:\n• Authentication with NextAuth.js.\n• Real-time messaging with Socket.io.\n• User presence (online/offline status) and typing indicators.\n• Message editing and deletion.\n• Responsive design for mobile and web.\n\n🏗️ Architecture:\nNext.js app and Socket.io run on the same port via the /api/socket endpoint, making it fully compatible with Vercel's serverless infrastructure without needing a separate backend server.",
      photos: [
        "/projects/5.2.png",
        "/projects/5.1.png"
      ],
      techStack: ["Next.js 16", "React 19", "Socket.io", "MongoDB", "NextAuth.js", "Zustand", "CSS Modules"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "#",
      category: "Web Application"
    },
    {
      id: 6,
      name: "Ramyoz Notes Application",
      description: "A high-performance workspace with optimistic UI, Google Auth, and a glassmorphic dark theme.",
      longDescription: "Ramyoz Notes is a premium note-taking workspace designed for speed and aesthetics. It features a minimalist dark-theme interface with instant feedback through optimistic UI updates.\n\n✨ Key Features:\n• Instant Interaction: Optimistic UI updates sync with the cloud in the background.\n• Secure Vault: NextAuth.js & Google OAuth integration.\n• Glassmorphic Aesthetic: Premium dark mode with blurs and Framer Motion animations.\n• Smart Notifications: Real-time feedback via a color-coded toast system.\n\n🛠️ Technology Stack:\nBuilt with Next.js 15 (App Router), React 19, MongoDB (Direct Driver), and NextAuth.js.",
      photos: [
        "/projects/6.1.png",
        "/projects/6.2.png"
      ],
      techStack: ["Next.js 15", "React 19", "MongoDB", "NextAuth.js", "Framer Motion", "Vanilla CSS"],
      gitHubLink: "https://github.com/Harsh-2006-git/Ramyoz-Notes-Application.git",
      liveLink: "https://ramyoz-notes-application-harsh.vercel.app/",
      category: "Web Application"
    },
    {
      id: 7,
      name: "Peer-to-Peer File Sharing System",
      description: "A console-based Python application for direct, serverless file exchange over TCP/IP networks.",
      longDescription: "A high-performance P2P file sharing application that leverages direct TCP/IP connections to bypass third-party servers. Designed for secure, efficient, and private file transfers.\n\n✨ Key Features:\n• Direct Peer Connectivity: Exchange files via IP and Port without intermediaries.\n• Modular Socket Design: Built using Python's socket library for reliability and scalability.\n• Guided Console Interface: User-friendly CLI for step-by-step connection and transfer.\n• Scalable Architecture: Ready for future integration of encryption and peer discovery.\n\n🎯 Learning Outcomes:\nDemonstrates practical implementation of networking concepts like IP addressing, port management, and connection-oriented communication.",
      photos: [
        "/projects/7.1.jpg",
        "/projects/7.2.jpg",
        "/projects/7.3.jpg"
      ],
      techStack: ["Python", "Socket Programming", "TCP/IP", "Networking", "CLI"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "#",
      category: "Networking Tool"
    },
    {
      id: 8,
      name: "Feedback Management System",
      description: "A dual-role MERN application for submitting, viewing, and managing user feedback.",
      longDescription: "A comprehensive Feedback Management System built on the MERN stack. Designed with dual accessibility to cater to both standard users and administrative personnel.\n\n👤 User Features:\n• Submit detailed feedback entries.\n• View personal submission history in a dedicated dashboard.\n\n🔐 Admin Features:\n• Global overview of all feedback submitted by every user.\n• Complete management authority to delete or review any entry.\n\n🛠️ Technology Stack:\nBuilt with MongoDB (Mongoose), Express.js, React, and Node.js for a robust full-stack experience.",
      photos: [
        "/projects/8.1.png",
        "/projects/8.2.png",
        "/projects/8.3.png",
        "/projects/8.4.png",
        "/projects/8.5.png"
      ],
      techStack: ["MongoDB", "Express", "React", "Node.js", "Axios", "Mongoose"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "#",
      category: "Full Stack Web"
    },
    {
      id: 9,
      name: "CollEdge Connect – Modern Connection Management",
      description: "A high-performance full-stack application for contact inquiry management with a premium UI/UX.",
      longDescription: "CollEdge Connect is a modern solution for managing enterprise contact inquiries. Built with a focus on speed and aesthetic excellence, it provides a seamless bridge between visitors and administrators.\n\n✨ Key Features:\n• Modern UI/UX: Glassmorphism and smooth animations via React and Tailwind CSS.\n• Dark Mode: Full system-wide theme support with persistent storage.\n• Contact Management: Real-time validation, toast notifications, and inquiry tracking.\n• Admin Dashboard: A secure hub to search, review, and manage all incoming metadata.\n\n🛠️ Technology Stack:\nEngineered with React 18, Vite, Node.js, Express, and MongoDB (Mongoose).",
      photos: [
        "/projects/9.1.png",
        "/projects/9.2.png"
      ],
      techStack: ["React 18", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Mongoose"],
      gitHubLink: "https://github.com/Harsh-2006-git",
      liveLink: "https://colledge-connect-assignment.vercel.app/",
      category: "Full Stack Web"
    }
  ];

  return NextResponse.json(projects);
}
