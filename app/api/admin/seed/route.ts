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

    // Seed Data (Append only, no deletion)
    if (seedData.projects && seedData.projects.length) {
      for (const p of seedData.projects) {
        await Project.findOneAndUpdate({ title: p.title }, p, { upsert: true });
      }
    }
    if (seedData.achievements && seedData.achievements.length) {
      for (const a of seedData.achievements) {
        await Achievement.findOneAndUpdate({ title: a.title }, a, { upsert: true });
      }
    }
    if (seedData.certificates && seedData.certificates.length) {
      for (const c of seedData.certificates) {
        await Certificate.findOneAndUpdate({ title: c.title }, c, { upsert: true });
      }
    }

    return NextResponse.json({ message: "Database synchronized with seed data! Existing custom projects were preserved." });
  } catch (error: any) {
    console.error("Seed API Error:", error.message);
    return NextResponse.json({ error: "Failed to seed database: " + error.message }, { status: 500 });
  }
}
