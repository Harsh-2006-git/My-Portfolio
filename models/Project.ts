import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  images: string[];
  link?: string;
  github?: string;
  techStack: string[];
  isFeatured: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  link: { type: String },
  github: { type: String },
  techStack: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

delete mongoose.models.Project;
export default mongoose.model<IProject>("Project", ProjectSchema);
