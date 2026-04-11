import { NextResponse } from "next/server";

export async function GET() {
  const achievements = [
    {
      id: 5,
      title: "1st Runner-Up - Technocrats Innovation Challenge 2K26",
      description: "Secured the 1st Runner-Up position at the Technocrats Innovation Challenge 2K26, a 36-hour innovation hackathon. Competing among 300+ teams across India, our team SarthiX (Harsh, Arun, Vivek, Amit) advanced to the Top 50 finalists and won a ₹15,000 cash prize.",
      date: "March 2026",
      images: [
        "/achivement/technocrats-3.jpg",
        "/achivement/technocrats-7.jpg",
        "/achivement/technocrats-4.jpg",
        "/achivement/technocrats-6.jpg",

        "/achivement/technocrats-2.jpg",
        "/achivement/technocrats-5.jpg",
        "/achivement/technocrats-1.jpg",

      ],
      icon: "Trophy",
    }
  ];

  return NextResponse.json(achievements);
}
