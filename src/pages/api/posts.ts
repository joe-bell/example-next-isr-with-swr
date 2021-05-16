import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts, Post } from "@/lib/db";

export interface PostsQuery {}
export interface PostsRes {
  posts?: Post[];
  error?: string;
}

export default async (_: NextApiRequest, res: NextApiResponse<PostsRes>) => {
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  try {
    const posts = await getAllPosts();

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error });
  }
};
