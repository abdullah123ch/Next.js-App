import { client } from "@/sanity/lib/client";
import { startupByIdQuery } from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

const StartupPage = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const post = await client.fetch(startupByIdQuery, {id});
    if (!post) return notFound();
    const content = md.render(post?.pitch || '');

    return (
            <>
            <section className="pink_container pattern">    
                <p className="tag tag-tri">
                    {formatDate(post?._createdAt)}
                </p>            
                
                <h1 className="heading">        
                    {post.title}
                </h1>
                
                <p className="sub-heading !max-w-5xl">
                    {post.description}
                </p>
            </section>
            
            <section className="section_container">
                <img src={post.image} alt={post.title} className="startup-details_img"/><br/>
                
                <div className="space-y-5 mt-10 max-w-5xl mx-auto">
                    <div className="flex items-center gap-5 flex-row justify-between">
                        <Link href={`/user/${post.author?._id}`} className="flex flex-row gap-3">
                            <img src={post.author.image} alt={post.author.name} className="author-img shadow-drop-lg"/>
                            
                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium color-black-300">@{post.author.username}</p>
                            </div>
                        </Link> 

                        <span className="category-tag">{post.category}</span>
                    </div><br/><br/>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {content ? (
                        <article className="prose max-w-5xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                        <p className="no-result">No content available</p>
                        )}
                </div>
                <hr className="divider"/>

                <Suspense fallback={<Skeleton className="view-skeleton"/>}>
                    <View id={post._id}/>
                </Suspense>
            </section>
        </>
    );
}

export default StartupPage;
