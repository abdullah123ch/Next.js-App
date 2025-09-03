"use server";

import { auth } from "@/auth";
import { parseServeractionres } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-clients";

export const createIdea = async (state: any, formdata: FormData, pitch: string) => {    
    const session = await auth();
    if (!session) {
        return parseServeractionres({error: "Unauthorized", status: "ERROR"});
    }

    const {title, description, category, link} = Object.fromEntries(Array.from(formdata.entries()).filter(([key]) => key !== "pitch"));
    const slug = slugify(title as string, {lower: true, strict: true});

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug:{
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            }, 
            pitch,
        }
        const result = await writeClient.create({_type: "startup", ...startup});
        return parseServeractionres({...result, error: "", status: "SUCCESS"});
 
    } catch (error) {
        console.log(error);
        return parseServeractionres({error: JSON.stringify(error) , status: "ERROR"});
    }
};

