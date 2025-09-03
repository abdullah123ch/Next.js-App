import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";  
import { auth } from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string }>}) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const session = await auth();
  const {data : posts} = await sanityFetch({query: startupQuery, params});
  
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch your startup, <br />
          connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Pitch your startup, connect with entrepreneurs, and grow your business
          with YC Directory.
        </p>
        <SearchForm query={query || ""} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold !max-w-3xl">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>
        <p><br/></p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
              ))
            ): (
              <p className="no-result">
                No posts found
              </p>
            )
          }
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
