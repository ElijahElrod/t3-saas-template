import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { CardHeader, Card, CardContent, CardTitle, CardDescription } from "~/components/ui/card";


export default function BlogCard({
    slug,
    title,
    description,
    imgUrl,
    tags }: {
        slug: string,
        title: string,
        description: string,
        imgUrl: string,
        tags?: string[]
    }) {
    return (
        <Card className="rounded-2xl">
            <CardHeader className="rounded h-3/4 items-center">
                <Image src={imgUrl}
                    width={480} height={320} alt="Card Header Image" className="rounded-xl h-full min-w-full " objectFit="fill" />

            </CardHeader>
            <CardContent className="border-t-2 p-4">
                {tags?.map((tag) => {
                    return (
                        <Link href={`/blog/category/${tag.toLowerCase()}`}>
                            <Badge>
                                {tag}
                            </Badge>
                        </Link>
                    )
                })}
                <Link href={`/blog/${slug}`}>
                    <CardTitle className="hover:text-indigo-400">{title}</CardTitle>
                </Link>

                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}