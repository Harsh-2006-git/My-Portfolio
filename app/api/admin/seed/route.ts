import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { seedData } from "@/data/seedData";
import { getSession } from "@/lib/auth";
import Project from "@/models/Project";
import Achievement from "@/models/Achievement";
import Certificate from "@/models/Certificate";

export async function POST(req: Request) {
  try {
    const payload = await getSession();
    if (!payload || !payload.username) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    await dbConnect();
    console.log("Seeding started...");

    const buildOps = (data: any[]) => data.map(item => ({
      updateOne: {
        filter: { title: item.title },
        update: { $set: item },
        upsert: true
      }
    }));

    // Perform bulk updates to avoid timeouts
    const tasks = [];
    
    if (seedData.projects?.length) {
      tasks.push(Project.bulkWrite(buildOps(seedData.projects)));
    }
    if (seedData.achievements?.length) {
      tasks.push(Achievement.bulkWrite(buildOps(seedData.achievements)));
    }
    if (seedData.certificates?.length) {
      tasks.push(Certificate.bulkWrite(buildOps(seedData.certificates)));
    }

    await Promise.all(tasks);
    console.log("Seeding completed successfully.");

    return NextResponse.json({ 
      message: "Database synchronized with seed data! All items updated/added successfully." 
    });
  } catch (error: any) {
    console.error("Seed API Error:", error);
    return NextResponse.json({ 
      error: "Failed to seed database: " + (error.message || "Unknown error") 
    }, { status: 500 });
  }
}
