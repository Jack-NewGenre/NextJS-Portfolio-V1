import { client } from "@/sanity/client";
import { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";

const ALL_BLOGS_QUERY = defineQuery(`*[
  _type == "blog" && defined(slug.current)
]{
  "slug": slug.current,
  "lastModified": coalesce(_updatedAt, _createdAt, now())
} | order(lastModified desc)`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` || `https://${process.env.VERCEL_URL}` || "http://localhost:3000";

  const blogs = await client.fetch(ALL_BLOGS_QUERY);

  const blogEntries: MetadataRoute.Sitemap = blogs
  .filter((blog): blog is { slug: string; lastModified: string } => blog.slug !== null)
  .map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.lastModified).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogEntries,
  ]
}
