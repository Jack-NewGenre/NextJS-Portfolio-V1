import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { sanityFetch } from "@/sanity/live";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";

const BLOG_QUERY = defineQuery(`*[
    _type == "blog" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
}`);

const BLOG_SLUGS_QUERY = defineQuery(`*[
  _type == "blog" && 
  defined(slug.current)
]{
  "slug": slug.current
}`);

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function generateStaticParams() {
  const blogs = await client.fetch(BLOG_SLUGS_QUERY);
  
  return blogs
    .filter((blog: { slug: string | null }) => blog.slug !== null)
    .map((blog: { slug: string | null }) => ({
      slug: blog.slug as string,
    }));
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });
  if (!blog) {
    return {
      title: `Post not found - Jack Cox`,
      description: `Post not found.`,
    }
  }
  const { name } = blog;
  return {
    title: `${name} - Jack Cox`,
    description: `Read the blog post "${name}" by Jack Cox.`,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });
  if (!blog) {
    notFound();
  }
  const { name, publishedAt, details, image } = blog;

  const imageUrl = image ? urlFor(image).width(600).height(400).url() : null;
  const published = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  return (
    <div className="pt-40 px-4 md:px-8 pb-16 bg-background w-full mx-auto">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          <div className="mb-4">
            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              ← Back to Blog
            </Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {imageUrl && (
              <Image src={imageUrl} alt={`${name} thumbnail`} width={1200} height={500} className="w-full max-h-96 object-cover" />
            )}
            <h1 className="text-4xl font-bold">{name}</h1>
            {published && <p className="text-sm opacity-60">{published}</p>}
            <div className="blogContent">
              <PortableText value={details || []} />
            </div>
        </Suspense>
      </div>
    </div>
  );
};
