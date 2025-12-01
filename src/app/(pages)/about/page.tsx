import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "About me - Jack Cox",
    description: "Learn more about Jack Cox, a developer at New Genre"
};

const AboutPage = () => {
    return ( 
        <div className="pt-40 px-4 md:px-8 pb-16 bg-background w-full mx-auto">
            <h2 className="text-8xl mb-15">Hey, I&apos;m Jack</h2>
            <div className="flex flex-col justify-between md:flex-row gap-16 md:gap-0">
                <div className="w-full md:w-4/9">
                    <p className="text-base text-foreground mb-8">Jack joined New Genre in 2025 as a developer, bringing with him a curiosity for how things work powered by a talent for making ideas real.</p>
                    <p className="text-base text-foreground mb-8">He approaches problems like puzzles waiting to be solved, quick to build, quick to adapt, and always open to feedback &mdash; taking joy in the process as much as the outcome.</p>
                    <p className="text-base text-foreground mb-8">His path began in digital marketing, where he first brushed against digital design before realising it was the gritty workings &mdash; the code beneath &mdash; that truly sparked his interest. That shift led him into development, where he discovered not just the satisfaction of fixing complex problems, but the momentum of always learning; each new skill building on the last, each challenge unlocking the next.</p>
                    <p className="text-base text-foreground mb-8">Outside the studio, Jack is fuelled by media and movement. He&apos;ll happily lose himself in the world of fantasy (Lord of the Rings remains a favourite), thrash through an agonising labyrinth in Dark Souls, or soundtrack his day with My Chemical Romance&apos;s Black Parade. He runs, lifts, and chases any sport that tests his coordination &mdash; even if, by his own admission, it&apos;s more for the teamwork than the trophy.</p>
                    <p className="text-base text-foreground mb-8">A Coventry native soon settling in London, Jack is always on the lookout for new experiences and small rituals that make a place feel like home. A cup of tea, milk, and one sugar. Anybody want a biscuit?</p>

                    <div className="mt-20 flex flex-col gap-8 w-full">
                        <div className="flex gap-2 w-full">
                            <div className="w-1/2">
                                <p className="text-sm text-foreground/60 uppercase">Clients</p>
                            </div>
                            <div className="w-1/2">
                                <ul>
                                    <li><Link href={"https://newgenre.studio/"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">New genre</Link></li>
                                    <li><Link href={"#"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">Portfolio</Link></li>
                                    <li><Link href={"https://jazatland.com/"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">J.A Zatland</Link></li>
                                    <li><Link href={"https://narratives.work/"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">Narratives Work</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-1/2">
                                <p className="text-sm text-foreground/60 uppercase">Services</p>
                            </div>
                            <div className="w-1/2">
                                <ul>
                                    <li className="text-sm text-foreground uppercase">Framer Development</li>
                                    <li className="text-sm text-foreground uppercase">UI/UX Implementation</li>
                                    <li className="text-sm text-foreground uppercase">API Integration</li>
                                    <li className="text-sm text-foreground uppercase">Dynamic Content</li>
                                    <li className="text-sm text-foreground uppercase">SEO & Performance</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-1/2">
                                <p className="text-sm text-foreground/60 uppercase">Socials</p>
                            </div>
                            <div className="w-1/2">
                                <ul>
                                    <li><Link href={"#"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">Instagram</Link></li>
                                    <li><Link href={"#"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">LinkedIn</Link></li>
                                    <li><Link href={"#"} target="_blank" className="text-sm text-foreground uppercase hover:line-through">X (Twitter)</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end relative md:w-4/9">
                    <Image className="sticky top-20 w-full h-[100vw] object-cover md:w-70 md:h-80" src="/profile.jpg" alt="Jack Cox profile" width={300} height={400} />
                </div>
            </div>
        </div>
     );
}

export default AboutPage;