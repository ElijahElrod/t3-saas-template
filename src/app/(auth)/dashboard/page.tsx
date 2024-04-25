
import Link from "next/link";
import CommunityCard, { CommunityCardProps } from "~/components/cards/community-card";


var communities: CommunityCardProps[] = [
    {
        name: 'Romance',
        description: 'Romance Description ',
        numMembers: "4000+"
    },
    {
        name: 'Sci-Fi',
        description: 'Dune Enthusiasts excited for their Dunussy ',
        numMembers: "69+"
    },
    {
        name: 'Lit-Fic',
        description: 'What even is Lit-Fic?',
        numMembers: "200+"
    },
    {
        name: 'Fantasy',
        description: 'For the Sarah J Maas Girlies',
        numMembers: "?????+"
    }
]


export default function Dashboard() {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 space-y-4">

            <h1 className="text-4xl font-extrabold tracking-tight text-green-400  p-4 mt-4">
                Community Book Clubs
            </h1>
            <div className="grid sm:grid-cols-4 container gap-4">
                {
                    communities.map((community: CommunityCardProps) => {
                        return (
                            <CommunityCard key={`${community.name}`} name={community.name} description={community.description} numMembers={community.numMembers} />
                        )
                    })
                }
            </div>
        </div>
    )
}