import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";
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
    const issuer = formData.get("issuer") as string;
    const date = formData.get("date") as string;
    const link = formData.get("link") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("files") as File[];

    let updateData: any = {
      title,
      issuer,
      date,
      link,
      description,
    };

    if (files.length > 0 && files.some(file => file instanceof File)) {
      let imageUrls: string[] = [];
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file, "certificates");
          imageUrls.push(url);
        }
      }
      updateData.images = imageUrls;
    }

    const certificate = await Certificate.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
