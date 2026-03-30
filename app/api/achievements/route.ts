import { NextResponse } from "next/server";

export async function GET() {
  const achievements = [
    {
      id: 1,
      title: "Winner HackSetu 1.0",
      description: "Secured first place in a national level 36-hour hackathon at Amity University Gwalior. Our project 'EduSync' was recognized for its innovative approach to collaborative learning.",
      date: "September 2025",
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      icon: "Trophy",
    },
    {
      id: 2,
      title: "Daily Coding Challenge Winner",
      description: "Solved 300+ Data Structures & Algorithms Problems. Awarded Daily Coding Challenge Winner (Jan & Feb 2025) on LeetCode for consistent solving.",
      date: "Jan & Feb 2025",
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      icon: "Code",
    },
    {
      id: 3,
      title: "Top 6.9% LeetCode Users",
      description: "Consistently solved problems for 100+ consecutive days in 2024 and 2025. Ranked among the top global users by solving highly challenging problems.",
      date: "2024 - 2025",
      images: [
        "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      icon: "TrendingUp",
    }
  ];

  return NextResponse.json(achievements);
}
