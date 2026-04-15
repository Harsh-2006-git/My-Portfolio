import { NextResponse } from "next/server";

export async function GET() {
  const info: Record<string, any> = {
    timestamp: new Date().toISOString(),
    node_env: process.env.NODE_ENV,
    mongodb_uri_set: !!process.env.MONGODB_URI,
    mongodb_uri_prefix: process.env.MONGODB_URI?.substring(0, 30) + "...",
  };

  try {
    // Test mongoose import
    const mongoose = await import("mongoose");
    info.mongoose_version = mongoose.default.version;

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      info.error = "MONGODB_URI is not set in environment variables!";
      return NextResponse.json(info, { status: 500 });
    }

    // Try connecting with a short timeout
    info.connection_attempt = "starting";
    await mongoose.default.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    info.connection_attempt = "success";
    info.db_name = mongoose.default.connection.name;
    info.db_host = mongoose.default.connection.host;

    await mongoose.default.disconnect();
    return NextResponse.json(info, { status: 200 });

  } catch (err: any) {
    info.connection_attempt = "failed";
    info.error_name = err.name;
    info.error_message = err.message;
    info.error_code = err.code;
    return NextResponse.json(info, { status: 500 });
  }
}
