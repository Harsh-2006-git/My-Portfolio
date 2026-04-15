import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Achievement from "@/models/Achievement";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(achievements);
  } catch (error: any) {
    console.error("Achievements GET Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const files = formData.getAll("files") as File[];

    let imageUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "achievements");
          imageUrls.push(url);
        }
      }
    }

    const achievement = await Achievement.create({
      title,
      description,
      date,
      images: imageUrls,
      icon: "Trophy",
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Achievement creation error:", error);
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}
