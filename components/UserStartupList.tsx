import React from "react";
import { client } from "@/sanity/lib/client";
import { authorStartupsQuery } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";


const UserStartupList = async ({id}: {id: string}) => {
    const startups = await client.fetch(authorStartupsQuery, {id});
    return (
        <>
            {startups?.length > 0 ? (startups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup?._id} post={startup} />
            ))): (
                <p className="no-result">
                    No startups found
                </p>
            )}
        </>
    );
};

export default UserStartupList;