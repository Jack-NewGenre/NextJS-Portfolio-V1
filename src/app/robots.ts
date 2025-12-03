import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
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
        ]
    }
}