import { getPost } from "~/server/post-loader";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "~/config/site";


type MetaDataProps = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: MetaDataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const post = await getPost(params.slug)


    return {
        title: `${siteConfig.name} Blog`
    }
}

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