import { NextResponse } from "next/server";

export async function GET() {
  const achievements = [
    {
      id: 1,
      title: "Winner - HackSetu 1.0 Hackathon",
      description: "Secured 1st Prize 🏆 at HackSetu 1.0, a National Level 24-hour Hackathon organized by Amity University, Gwalior. Out of 600+ teams across India, our project 'Smart Pilgrim Assistant System' by Team Manthan was selected as the winner.",
      date: "November 2025",
      images: [
        "/achivement/hacksetu-3.jpg",
        "/achivement/hacksetu-1.jpg",
        "/achivement/hacksetu-2.jpg",
        "/achivement/hacksetu-5.jpg",

        "/achivement/hacksetu-4.jpg",

      ],
      icon: "Trophy",
    },
    {
      id: 5,
      title: "1st Runner-Up - Technocrats Innovation Challenge 2K26",
      description: "Secured the 1st Runner-Up position at the Technocrats Innovation Challenge 2K26, a 36-hour innovation hackathon. Competing among 300+ teams across India, our team SarthiX (Harsh, Arun, Vivek, Amit) advanced to the Top 50 finalists and won a ₹15,000 cash prize.",
      date: "March 2026",
      images: [
        "/achivement/technocrats-3.jpg",
        "/achivement/technocrats-4.jpg",
        "/achivement/technocrats-2.jpg",
        "/achivement/technocrats-5.jpg",
        "/achivement/technocrats-1.jpg",
        "/achivement/technocrats-6.jpg",
        "/achivement/technocrats-7.jpg"
      ],
      icon: "Trophy",
    },
    {
      id: 6,
      title: "MITS Alumni Portal Launch",
      description: "Successfully designed and developed the official MITS Alumni Portal, which was officially adopted by the institute. Honored with the Meritocracy Award on MITS Day 2026 for this contribution to the institute during the launch event.",
      date: "March 2026",
      images: [

        "/achivement/alumni-portal-1.jpg",
        "/achivement/alumni-portal-2.jpg",
        "/achivement/alumni-portal-3.png"
      ],
      icon: "Trophy",
    },
    {
      id: 7,
      title: "LeetCode Milestone - DSA Excellence",
      description: "Consistently solving challenging Data Structures and Algorithms problems on LeetCode. Earning badges and reaching milestones while optimizing problem-solving approaches and enhancing algorithmic thinking.",
      date: "April 2026",
      images: ["/achivement/leetcode-milestone.png"],
      icon: "Code",
    },
    {
      id: 8,
      title: "Meritocracy Award - MITS Day 2026",
      description: "Honored with the **Meritocracy Award** on MITS Day 2026 for significant contributions to quality improvement at Madhav Institute of Technology and Science, Gwalior. The award recognizes the successful development and implementation of the institute's official Alumni Portal.",
      date: "10 March 2026",
      images: [

        "/achivement/meritocracy-1.jpg",
        "/achivement/meritocracy-2.jpg",
        "/achivement/meritocracy-3.jpg",
        "/achivement/meritocracy-4.jpg",
        "/achivement/meritocracy-5.jpg"
      ],
      icon: "Medal",
    }
  ];

  return NextResponse.json(achievements);
}
