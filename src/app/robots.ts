import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/contact/", "/about"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: [""],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`
    }
}