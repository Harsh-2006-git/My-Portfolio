import mongoose, { Schema, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  date: string;
  images: string[];
  icon: string;
  order: number;
  createdAt: Date;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  images: [{ type: String }],
  icon: { type: String, default: "Trophy" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", AchievementSchema);
