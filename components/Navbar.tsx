import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="navbar_header">
            <nav className="flex-between text-black">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={144} height={30} />
                </Link>
                <div className="flex-between gap-5 ">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="hidden-max-sm">
                                    Create
                                </span>
                                <BadgePlus className="size-6 color-primary hidden-sm" />
                            </Link>
                             
                            <form action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit">
                                    <span className="hidden-max-sm">
                                        Logout
                                    </span>
                                    <LogOut className="logout hidden-sm" />
                                </button>
                            </form>
                            
                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} className="startup-card_avatar"/>
                                    <AvatarFallback>
                                        AV
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </>

                    ) : (
                        <form action={async () => {
                          "use server";
          
                          await signIn('github');
                        }}>
                            <button type="submit">
                                Login
                            </button>
                        </form>
                    )}
 
                </div>
            </nav>
        </header>
    )
}

export default Navbar
