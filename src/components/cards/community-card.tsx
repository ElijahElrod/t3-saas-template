import Link from "next/link"


export type CommunityCardProps = {
    name: string,
    description: string,
    numMembers: string
}

export default function CommunityCard({ name, description, numMembers }: CommunityCardProps) {


    return (
        <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-foreground hover:bg-slate-400"
            href={`/community/${name}`}
            target="_blank"
        >
            <div className="flex flex-row space-x-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div>Readers: {numMembers}</div>
            </div>

            <div className="text-lg">
                {description}
            </div>
        </Link>
    )
}