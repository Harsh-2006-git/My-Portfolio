"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A048" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/white" },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
  { name: "Azure", icon: "https://cdn.simpleicons.org/microsoftazure/0078D4" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
];

export default function TechStackGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-12">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
        >
          <img src={tech.icon} alt={tech.name} className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
