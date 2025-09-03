import React from "react";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();
    if (!session) return redirect("/login");
    
    return (
        <>
            <section className="pink_container pattern !min-h-[230px]">
                <h1 className="heading">
                    Startup Create Page
                </h1>
            </section>
            <StartupForm />
        </>
    );
};

export default page;
