export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section >
            <div className="grid grid-cols-2">
                <div>
                    {children}
                </div>
                <div>
                    {/* Author Content, Related posts? */}
                </div>

            </div>

        </section>
    )
}