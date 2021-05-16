import useSWR, { SWRConfiguration } from "swr";
import { PostsQuery, PostsRes } from "@/pages/api/posts";
import { fetcher } from "@/utils/fetcher";

export interface UseAllPostsProps
  extends SWRConfiguration,
    Partial<PostsQuery> {}

export const useAllPosts = (config?: UseAllPostsProps) => {
  const swr = useSWR<PostsRes>("/api/posts/", fetcher, config);

  const isLoading = !swr.error && !swr.data;

  return {
    ...swr,
    isLoading,
  };
};
