import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Projects GET Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const github = formData.get("github") as string;
    const techStackStr = formData.get("techStack") as string;
    const files = formData.getAll("files") as File[];

    console.log("Creating project:", { title, imageUrlsCount: files.length });


    let imageUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "projects");
          imageUrls.push(url);
        }
      }
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const techStack = techStackStr ? JSON.parse(techStackStr) : [];

    const project = await Project.create({
      title,
      description,
      images: imageUrls,
      link,
      github,
      techStack,
    });

    console.log("Project created successfully:", project.title);
    return NextResponse.json(project);
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
