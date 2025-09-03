"use client";

import React, { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MdEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createIdea } from "@/lib/actions";

const StartupForm = () => {
    const [errors, setError ] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();
    const handelSubmit = async (prevState: any, formdata: FormData) => {
        try {
            const formValues = {
                title: formdata.get("title") as string,
                description: formdata.get("description") as string,
                category: formdata.get("category") as string,
                link: formdata.get("link") as string,
                pitch,
            }    
            await formSchema.parseAsync(formValues);
            const result = await createIdea(prevState, formdata, pitch);
            console.log(result);
            if (result.status === "SUCCESS") {
                toast.success("Success", { description: "Startup created successfully" });
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);
                toast.error("Error", { description: "Please check your inputs and try again" });
                return {...prevState, error: "Validation failed", status: "ERROR"};
            }     
            toast.error("Error", { description: "Something went wrong" });
            return {...prevState, error: "Something went wrong", status: "ERROR"};       
        }};
    const [state, formAction, isPending] = useActionState(handelSubmit, {error: "", status: "INITIAL"});
    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label> 
                <Input type="text" id="title" name="title" className="startup-form_input" required placeholder="Startup title" />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Description</label> 
                <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup description" />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label> 
                <Input type="text" id="category" name="category" className="startup-form_input" required placeholder="Startup category(eg: Tech, Business, etc.....)" />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label> 
                <Input type="text" id="link" name="link" className="startup-form_input" required placeholder="Startup image URL" />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label> 
                <MdEditor 
                    value={pitch} 
                    onChange={(value) => setPitch(value as string)} 
                    id="pitch" 
                    preview="edit" 
                    height={300} 
                    style={{ borderRadius: 20, overflow: "hidden" }} 
                    textareaProps={{placeholder: "Briefly describe your idea and what problem it solves"}} 
                    previewOptions={{disallowedElements: ["style"]}} 
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div><br/><br/>
            <Button type="submit" className={`startup-form_btn text-white ${isPending ? "bg-gray-500 border-gray-700 cursor-not-allowed" : "bg-[var(--color-primary)]"}`} disabled={isPending}>
                {isPending ? "Submitting..." : "Submit your Startup"}
                <Send className="ml-2 size-6" />
            </Button>


        </form>
    );
};

export default StartupForm;


