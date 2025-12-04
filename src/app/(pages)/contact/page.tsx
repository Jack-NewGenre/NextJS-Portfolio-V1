import EnquiryPopup from "@/components/molecules/EnquiryPopup";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
    return ( 
        <div className="pt-40 px-4 pb-16 bg-background w-full md:px-8">
            <div className="flex justify-between flex-col gap-24 md:flex-row md:gap-16">
                <div className="w-full md:w-1/2 lg:w-2/3">
                    <h1 className="text-6xl mb-12 uppercase">Contact Me</h1>
                    <div className="flex flex-col gap-20 sm:flex-row md:flex-col lg:flex-row">

                        <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
                            <p className="text-base text-foreground">Let&#39;s create something meaningful together.<br /> I&#39;d love to hear about your project, big or small.</p>
                            <EnquiryPopup trigger={
                                <Button className="mt-8 group" variant="default" size="default">
                                    Start a project <ArrowRight className="rotate-0 group-hover:-rotate-45 transition-all duration-300" />
                                </Button>
                            }
                            />
                        </div>

                        <div className="w-full sm:w-1/2 md:w-full lg:w-1/2 flex flex-col gap-8">
                            <div>
                                <p className="text-sm text-foreground/60 uppercase">Email &amp; Phone</p>
                                <ul>
                                    <li><Link href={"mailto:coxy@newgenre.studio"} rel="nofollow" target="_blank" className="text-sm text-foreground uppercase hover:line-through">coxy@newgenre.studio</Link></li>
                                    <li><Link href={"tel:+1234567890"} rel="nofollow" target="_blank" className="text-sm text-foreground uppercase hover:line-through">+1234567890</Link></li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60 uppercase">Socials</p>
                                <ul>
                                    <li><Link href={"#"} rel="nofollow" target="_blank" className="text-sm text-foreground uppercase hover:line-through">Instagram</Link></li>
                                    <li><Link href={"#"} rel="nofollow" target="_blank" className="text-sm text-foreground uppercase hover:line-through">LinkedIn</Link></li>
                                    <li><Link href={"#"} rel="nofollow" target="_blank" className="text-sm text-foreground uppercase hover:line-through">X (Twitter)</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 flex justify-end relative">
                    <Image className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987" alt="Jack Cox profile" width={500} height={700} />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <Image className="w-75 h-75" src="/smile.webp" alt="Smile Animation" width={200} height={200} />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default ContactPage;