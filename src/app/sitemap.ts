import { fetchPages } from "@/lib/notion";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";

    const posts: QueryDatabaseResponse = await fetchPages();

    const postEntries: MetadataRoute.Sitemap = posts.results
    .filter(
        (post): post is PageObjectResponse =>
        post.object === "page" && "properties" in post
    )
    .map((post) => {
        const slug = post.properties.Slug.type === "rich_text"? post.properties.Slug.rich_text[0]?.plain_text ?? "": "";

        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(post.last_edited_time).toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        };
    });

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
    ...postEntries,
  ]
}
