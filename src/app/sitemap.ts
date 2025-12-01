import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.VERCEL_URL || "http://localhost:3000";

  return [
    {
      url: `${site}/`,
      lastModified: new Date().toISOString(),
    },
  ]
}
