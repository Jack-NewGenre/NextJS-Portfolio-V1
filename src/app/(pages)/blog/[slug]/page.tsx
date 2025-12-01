import { fetchBySlug, fetchPageBlocks, notion } from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import Image from "next/image";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const postMeta = await fetchBySlug(slug);

  if (!postMeta) {
    return {
      title: `Post not found - Jack Cox`,
      description: `Post not found.`,
    }
  }

  const title =
    postMeta.properties.Title.type === "title"
      ? postMeta.properties.Title.title[0]?.plain_text ?? ""
      : "";

  return {
    title: `${title} - Jack Cox`,
    description: `Read the blog post "${title}" by Jack Cox.`,
  }
}

const SinglePostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const post = await fetchBySlug(slug);

  if (!post) {
    return <div className="pt-16">Post not found</div>;
  }

  // Extract title, date and thumbnail
  const title =
    post.properties.Title.type === "title"
      ? post.properties.Title.title[0]?.plain_text ?? ""
      : "";

  const dateProperty = post.properties.Date;
  const date =
    dateProperty?.type === "created_time"
      ? dateProperty.created_time
      : "";
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const thumbnailProperty = post.properties.Thumbnail;
  let thumbnail = "";
  if (thumbnailProperty?.type === "files" && thumbnailProperty.files.length > 0) {
    const fileObj = thumbnailProperty.files[0];
    if (fileObj.type === "external") thumbnail = fileObj.external.url;
    if (fileObj.type === "file") thumbnail = fileObj.file.url;
  }

  // Fetch page blocks
  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks);

  return (
    <div className="pt-40 px-4 md:px-8 pb-16 bg-background w-full mx-auto">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        {/* Thumbnail */}
        {thumbnail && (
          <Image src={thumbnail} alt={`${title} thumbnail`} width={1200} height={500} className="w-full max-h-96 object-cover" />
        )}

        {/* Title & Date */}
        <h1 className="text-4xl font-bold">{title}</h1>
        {formattedDate && <p className="text-sm opacity-60">{formattedDate}</p>}

        {/* Notion content */}
        <div className="blogContent" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export default SinglePostPage;
