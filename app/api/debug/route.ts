import { NextResponse } from "next/server";

export async function GET() {
  const info: Record<string, any> = {
    timestamp: new Date().toISOString(),
    node_env: process.env.NODE_ENV,
    mongodb_uri_set: !!process.env.MONGODB_URI,
    mongodb_uri_prefix: process.env.MONGODB_URI
      ? process.env.MONGODB_URI.substring(0, 40) + "..."
      : "NOT SET",
  };

  try {
    const mongoose = await import("mongoose");
    info.mongoose_version = mongoose.default.version;

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      info.result = "FAIL";
      info.error = "MONGODB_URI is not set!";
      return NextResponse.json(info, { status: 200 });
    }

    info.connection_attempt = "starting";
    await mongoose.default.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });

    info.result = "SUCCESS";
    info.db_name = mongoose.default.connection.name;
    info.db_host = mongoose.default.connection.host;
    await mongoose.default.disconnect();

  } catch (err: any) {
    info.result = "FAIL";
    info.error_name = err.name;
    info.error_message = err.message;
    info.error_code = err.code;
  }

  // Always return 200 so we can read the body
  return NextResponse.json(info, { status: 200 });
}
