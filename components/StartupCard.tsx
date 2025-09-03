import React from "react";
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = ({post}: {post: StartupTypeCard}) => {
    const { _createdAt, views, author, _id, title, description, image, category } = post;
    return (
        <li className="startup-card group">
            <div className="flex-between items-start">
                {/* Left section: date + author */}
                <div className="flex flex-col ">
                    <p className="startup-card_date">
                        {formatDate(_createdAt)}
                    </p>
                    <br/>
                    <Link href={author?._id ? `/user/${author._id}` : "#" }>
                        <span className="startup-card_author">
                            {author?.name || "Unknown"}
                        </span>
                    </Link>
                    <br/>
                    <Link href={_id ? `/startup/${_id}` : "#" }>
                        <span className="startup-card_title">
                            {title || "Unknown"}
                        </span>
                    </Link>
                </div>

                {/* Right section: views */}
                <div className="flex items-center">
                    <div className="flex flex-row">
                        <EyeIcon className="size-6 color-primary" />
                        <span className="text-16-medium ">{views}</span>
                    </div>
                    <br/><br/>
                    <Link href={_id ? `/startup/${_id}` : "#" } className="ml-auto">
                        <Image src={author?.image || "https://placehold.co/48x48"} alt="placehold.co" width={48} height={48} className="startup-card_avatar" />
                    </Link>
                </div>
            </div>

            <Link href={_id ? `/startup/${_id}` : "#" }>
                <p className="startup-card_desc">   
                    {description || "Description"}
                </p>
                <img src={image} alt="placehold"  className="startup-card_img"/>
            </Link>
            <br/>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <button className="startup-card_btn">
                    <Link href={_id ? `/startup/${_id}` : "#" }>
                        Details
                    </Link>
                </button>
            </div>
        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );

export default StartupCard  