import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { useAllPosts } from "@/hooks/use-all-posts";
import { getAllPosts, Post } from "@/lib/db";
import { styles } from "@/styles";

interface Params {
  initialData: {
    posts: Post[];
  };
}

const Index: NextPage<Params> = ({ initialData }) => {
  const { data, isLoading } = useAllPosts({
    initialData,
  });

  const posts = !isLoading && data.posts;

  return (
    <AppShell>
      <h1 className={styles.h1}>Next.js Static Pages with SWR</h1>
      <p className="mt-1 text-gray-600">
        Lightning fast static pages, kept up to date with SWR
      </p>
      <p className="mt-4">
        Any changes made to content will be saved to the cache, whilst static
        pages revalidate in the background.
        <small className="block mt-1 text-gray-600">
          (in this example, content is only saved to the cache)
        </small>
      </p>
      <p className="mt-4">
        <a className="text-blue-700" href="https://joebell.co.uk">
          Read the accompanying blog post
        </a>
      </p>

      <h2 className={`${styles.h2} mt-6`}>Posts</h2>
      <ol className="list-decimal ml-5 mt-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </AppShell>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<Params> = async () => {
  const posts = await getAllPosts();

  return {
    props: { initialData: { posts } },
    revalidate: 1,
  };
};
