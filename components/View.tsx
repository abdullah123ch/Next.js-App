import React from "react";
import Ping from "./Ping";
import { startupViewsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-clients";
import { after } from 'next/server';

const View = async ({id}: {id: string}) => {
    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(startupViewsQuery, {id});
    after(async () => await writeClient.patch(id).set({views: totalViews + 1}).commit());

    return (
        <div className="view-container">
            <div className="abs-top-right">
                <Ping/>
            </div>
            
            <p className="view-text">
                <span className="text-18-medium color-black-100">Views:{totalViews}</span>
            </p>
        </div>
    );
};

export default View;
