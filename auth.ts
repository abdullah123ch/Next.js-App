import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { authorbyGithubIdQuery } from "@/sanity/lib/queries"
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-clients";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user, profile}) {
      const existingUser = await client.fetch(authorbyGithubIdQuery, {id: profile?.id});

      if (!existingUser) {
        await writeClient.config({useCdn: false}).create({
          _type: "author",
          id: profile?.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }
      return true;
    },
    async jwt({token, account, profile}) {
      if(account && profile) {
        const user = await client.config({useCdn: false}).fetch(authorbyGithubIdQuery, {id: profile?.id});
        token.id = user?._id;
      }
      return token;
    },
    async session({session, token}) {
      Object.assign(session, {id: token.id});
      return session;
    },
  },
});