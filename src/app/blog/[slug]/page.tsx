import { getPost } from "~/server/post-loader";
import { notFound } from "next/navigation";

export default async function BlogPost({
    params,
}: {
    params: {
        slug: string
    }
}) {
    const post = await getPost(params.slug)
    // notFound is a Next.js utility
    if (!post) return notFound()
    // Pass the post contents to MDX
    return <div>{post?.body}</div>
}