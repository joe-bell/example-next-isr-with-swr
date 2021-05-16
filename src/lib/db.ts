import { posts as dbPosts, Post as DBPost } from "@/mock-db/posts";

export interface Post extends DBPost {}

export interface GetPostProps {
  id: Post["id"];
}

export const getPost = async ({ id }: GetPostProps): Promise<Post> => {
  const post = dbPosts.find((post) => post.id === id);
  return post;
};

export const getAllPosts = async (): Promise<Post[]> => {
  return dbPosts;
};
