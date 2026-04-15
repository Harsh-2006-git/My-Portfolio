
import dbConnect from "./lib/db";
import Project from "./models/Project";

async function checkProjects() {
    await dbConnect();
    const projects = await Project.find({});
    console.log("Current Projects in DB:", projects.map(p => p.title));
    process.exit(0);
}

checkProjects();
