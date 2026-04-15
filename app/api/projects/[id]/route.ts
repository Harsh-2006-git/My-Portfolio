import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const github = formData.get("github") as string;
    const techStackStr = formData.get("techStack") as string;
    const files = formData.getAll("files") as File[];

    let updateData: any = {
      title,
      description,
      link,
      github,
      techStack: techStackStr ? JSON.parse(techStackStr) : [],
    };

    if (files.length > 0 && files.some(file => file instanceof File)) {
      let imageUrls: string[] = [];
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "projects");
          imageUrls.push(url);
        }
      }
      updateData.images = imageUrls;
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
