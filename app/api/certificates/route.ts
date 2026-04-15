import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(certificates);
  } catch (error: any) {
    console.error("Certificates GET Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const date = formData.get("date") as string;
    const link = formData.get("link") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("files") as File[];

    let imageUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "certificates");
          imageUrls.push(url);
        }
      }
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const certificate = await Certificate.create({
      title,
      issuer,
      date,
      link,
      description,
      images: imageUrls,
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Certificate creation error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
