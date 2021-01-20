import { NextApiRequest, NextApiResponse } from "next";
import { getPost, GetPostProps, Post } from "@/lib/db";

export interface PostQuery extends GetPostProps {}
export interface PostRes {
  post?: Post;
  error?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<PostRes>) => {
  try {
    const { id } = (req.query as unknown) as PostQuery;

    const post = await getPost({ id });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
};
