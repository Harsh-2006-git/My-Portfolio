import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: string;
  images: string[];
  description?: string;
  link?: string;
  order: number;
  createdAt: Date;
}

const CertificateSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
  link: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
