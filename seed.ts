import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import Project from './models/Project';
import Achievement from './models/Achievement';
import Certificate from './models/Certificate';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^#\s]+?)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

async function extractArrayFromFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/const \w+ = (\[[\s\S]*?\]);\s*return/);
  if (match && match[1]) {
    return eval(match[1]); 
  }
  return [];
}

async function uploadImage(localPath: string, folderName: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', localPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}, using placeholder`);
      return '';
    }
    console.log(`Uploading ${localPath}...`);
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: `portfolio/${folderName}`,
    });
    return result.secure_url;
  } catch (err: any) {
    console.error(`Failed to upload ${localPath}:`, err.message);
    return '';
  }
}

async function runSeed() {
  if (!process.env.MONGODB_URI) throw new Error("No MONGODB_URI");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB:", process.env.MONGODB_URI);

  // Clear existing data
  await Project.deleteMany({});
  await Achievement.deleteMany({});
  await Certificate.deleteMany({});
  console.log("Cleared existing data.");

  const projects = await extractArrayFromFile('old_projects.ts');
  const achievements = await extractArrayFromFile('old_achievements.ts');
  const certificates = await extractArrayFromFile('old_certificates.ts');

  // Seed Projects
  for (const p of projects) {
    console.log(`Processing project: ${p.title || p.name}`);
    const imageUrl = p.photos && p.photos.length > 0 ? await uploadImage(p.photos[0], 'projects') : '';
    await Project.create({
      title: p.title || p.name,
      description: p.longDescription || p.description,
      image: imageUrl,
      techStack: p.techStack || [],
      github: p.gitHubLink || "",
      link: p.liveLink || "",
      category: p.category || "",
    });
  }

  // Seed Achievements
  for (const a of achievements) {
    console.log(`Processing achievement: ${a.title}`);
    const imageUrls = [];
    for (const img of (a.images || [])) {
       const url = await uploadImage(img, 'achievements');
       if (url) imageUrls.push(url);
    }
    await Achievement.create({
      title: a.title,
      description: a.description,
      date: a.date,
      images: imageUrls,
      icon: a.icon || 'Award',
    });
  }

  // Seed Certificates
  for (const c of certificates) {
    console.log(`Processing certificate: ${c.title}`);
    const imageUrl = c.images && c.images.length > 0 ? await uploadImage(c.images[0], 'certificates') : '';
    await Certificate.create({
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      image: imageUrl,
      link: c.link || "",
    });
  }

  console.log("Seeding complete!");
  process.exit(0);
}

runSeed().catch(err => {
  console.error(err);
  process.exit(1);
});
