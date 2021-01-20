import useSWR, { ConfigInterface } from "swr";
import { PostQuery, PostRes } from "@/pages/api/post/[id]";
import { fetcher } from "@/utils/fetcher";

export interface UsePostProps extends ConfigInterface, Partial<PostQuery> {}

export const usePost = ({ id, ...config }: UsePostProps) => {
  const swr = useSWR<PostRes>(!id ? null : "/api/post/" + id, fetcher, config);

  const isLoading = !swr.error && !swr.data;

  return {
    ...swr,
    isLoading,
  };
};
