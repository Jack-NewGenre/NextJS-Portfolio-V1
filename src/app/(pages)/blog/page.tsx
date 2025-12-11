import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { sanityFetch } from "@/sanity/live";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BLOGLIST_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
]{
  ...,
  "date": coalesce(date, now()),
}`);

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: blog } = await sanityFetch({
    query: BLOGLIST_QUERY,
    params: await params,
  });
  if (!blog) {
    notFound();
  }

  return (
    <div className="pt-40 px-4 md:px-8 pb-16 bg-background w-full mx-auto">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-6xl uppercase mb-10 md:text-9xl">Journal</h1>
        <ul className="flex flex-col">
          {blog.map((b) => {
            const imageUrl = b.image ? urlFor(b.image).width(600).height(400).url() : null;
            const published = new Date(b.publishedAt ?? Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
              return (
                <li key={b._id} className="flex flex-col items-center justify-between pb-8 mb-8 border-b border-foreground/10 w-full md:flex-row">
                  <Link
                    href={`/blog/${b.slug?.current}`}
                    className="text-base w-full flex flex-col justify-between md:flex-row"
                  >
                    {imageUrl && (
                      <Image src={imageUrl} alt={b.name || "Blog"} width={300} height={300} className="w-full h-auto object-cover md:w-1/3" />
                    )}
                    <div className="flex flex-col gap-2 w-full py-4 px-0 md:px-8 md:w-2/3">
                      <h2 className="text-2xl">{b.name}</h2>
                      <p className="text-sm opacity-70">{published}</p>
                      { /* <PortableText value={b.details || []} /> */ }
                      <Button className="mt-2 w-max group" variant="default">Read Article <ArrowRight className="rotate-0 group-hover:-rotate-45 transition-all duration-300" /></Button>
                    </div>
                  </Link>
                </li>
                );
            })}
        </ul>
      </div>
    </div>
    
  );
};
