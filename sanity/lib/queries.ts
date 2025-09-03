import {defineQuery} from "next-sanity";

export const startupQuery = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  (
    !defined($search) ||
    category match $search ||
    title match $search ||
    author->name match $search
  )
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  author->{
    name,
    _id,
    image,
    bio
  },
  _createdAt,
  views,
  image,
  description,
}
`);

export const startupByIdQuery = defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  category,
  author->{
    name,
    _id,
    username,
    image,
    bio
  },
  _createdAt,
  views,
  image,
  description,
  pitch,
}
`);

export const startupViewsQuery = defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  views,
}`);

export const authorbyGithubIdQuery = defineQuery(`*[_type == "author" && id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
}`);

export const authorByIdQuery = defineQuery(`*[_type == "author" && _id == $id][0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
}`);

export const authorStartupsQuery = defineQuery(`*[
  _type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  author->{
    name,
    _id,
    image,
    bio
  },
  _createdAt,
  views,
  image,
  description,
}
`);