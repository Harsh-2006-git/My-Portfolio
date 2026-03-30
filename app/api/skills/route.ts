import { NextResponse } from "next/server";

export async function GET() {
  const skills = {
    "Languages & Databases": [
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "SQL", level: 75 },
      { name: "Python", level: 60 },
      { name: "HTML/CSS", level: 95 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
    ],
    "Frameworks & Libraries": [
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 80 },
      { name: "Socket.IO", level: 75 },
    ],
    "Tools & Services": [
      { name: "Git & GitHub", level: 90 },
      { name: "Azure Services", level: 70 },
      { name: "Postman", level: 95 },
      { name: "Docker", level: 65 },
      { name: "Cloudinary", level: 85 },
      { name: "JWT", level: 85 },
    ],
    "Core CS Fundamentals": [
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "Object-Oriented Programming", level: 85 },
      { name: "DBMS", level: 80 },
      { name: "Computer Networks", level: 75 },
    ]
  };

  return NextResponse.json(skills);
}
