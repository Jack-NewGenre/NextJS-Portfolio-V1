import BlogListItem from "@/components/molecules/BlogListItem";
import { Suspense } from "react";

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="pt-40 px-4 md:px-8 pb-16 bg-background w-full mx-auto">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-6xl uppercase mb-10 md:text-9xl">Journal</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogListItem params={params} />
        </Suspense>
      </div>
    </div>
    
  );
};
