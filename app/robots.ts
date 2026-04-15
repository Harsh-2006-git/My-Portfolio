import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.harshmanmode.tech/sitemap.xml",
    host: "https://www.harshmanmode.tech",
  };
}
