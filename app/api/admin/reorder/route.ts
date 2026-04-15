import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getSession } from "@/lib/auth";
import Project from "@/models/Project";
import Achievement from "@/models/Achievement";
import Certificate from "@/models/Certificate";

export async function PUT(req: Request) {
  try {
    const payload = await getSession();
    if (!payload || !payload.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tab, updates } = await req.json();

    if (!tab || !updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await dbConnect();

    const modelMap: any = {
      projects: Project,
      achievements: Achievement,
      certificates: Certificate,
    };

    const Model = modelMap[tab];
    if (!Model) return NextResponse.json({ error: "Invalid collection" }, { status: 400 });

    // Bulk update the documents
    const bulkOps = updates.map((update: any) => ({
      updateOne: {
        filter: { _id: update.id },
        update: { order: update.order },
      },
    }));

    await Model.bulkWrite(bulkOps);

    return NextResponse.json({ message: "Reordered successfully" });
  } catch (error: any) {
    console.error("Reorder Error:", error.message);
    return NextResponse.json({ error: "Failed to reorder: " + error.message }, { status: 500 });
  }
}
