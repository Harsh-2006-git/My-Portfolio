import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Achievement from "@/models/Achievement";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const files = formData.getAll("files") as File[];

    let updateData: any = {
      title,
      description,
      date,
    };

    if (files.length > 0 && files.some(file => file instanceof File)) {
      let imageUrls: string[] = [];
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "achievements");
          imageUrls.push(url);
        }
      }
      updateData.images = imageUrls;
    }

    const achievement = await Achievement.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!achievement) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    return NextResponse.json(achievement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
