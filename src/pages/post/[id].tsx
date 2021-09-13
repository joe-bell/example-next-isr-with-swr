import * as React from "react";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { usePost } from "@/hooks/use-post";
import { getAllPosts, getPost } from "@/lib/db";
import { styles } from "@/styles";

const PostPage = ({
  id,
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading } = usePost({
    id,
    fallbackData,
    revalidateOnMount: false,
  });

  const post = !isLoading && data.post;

  return (
    <AppShell>
      <header className="flex flex-col space-y-4">
        <Link href={`/post/edit/${post.id}`} replace>
          <a className={`${styles.button.secondary} text-right self-end`}>
            Edit
          </a>
        </Link>

        <h1 className={styles.h1}>{post.title}</h1>
      </header>

      <article className="mt-4">
        <p>{post.content}</p>
      </article>
    </AppShell>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPosts().then((posts) =>
    posts.map((post) => ({
      params: {
        id: post.id,
      },
    }))
  );

  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  const post = await getPost({
    id: context.params.id as string,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: post.id,
      fallbackData: {
        post,
      },
    },
    revalidate: 1,
  };
};
