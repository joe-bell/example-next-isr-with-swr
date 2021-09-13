import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { config } from "@/config";
import { AppShell } from "@/components/app-shell";
import { useAllPosts } from "@/hooks/use-all-posts";
import { getAllPosts } from "@/lib/db";
import { styles } from "@/styles";

const Index = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading } = useAllPosts({
    fallbackData,
    revalidateOnMount: false,
  });

  const posts = !isLoading && data.posts;

  return (
    <AppShell>
      <h1 className={styles.h1}>{config.title}</h1>
      <p className="mt-1 text-gray-600">{config.description}</p>
      <p className="mt-8">
        Visit a post and click "Edit". Any changes made to content will be saved
        to the cache, whilst static pages revalidate in the background.
        <small className="block mt-1 text-gray-600">
          (in this example, content is only saved to the cache)
        </small>
      </p>
      <p className="mt-4">
        <a
          className="underline"
          href="https://joebell.co.uk/blog/updating-static-next-js-pages-instantly"
        >
          Read the accompanying blog post
        </a>
      </p>

      <h2 className={`${styles.h2} mt-8`}>Posts</h2>
      <ol className="list-decimal ml-5 mt-4 space-y-1">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a className="underline">{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </AppShell>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: { fallbackData: { posts } },
    revalidate: 1,
  };
};
