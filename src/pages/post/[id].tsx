import * as React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppShell } from "@/components/app-shell";
import { usePost, UsePostProps } from "@/hooks/use-post";
import { getAllPosts, getPost, Post } from "@/lib/db";
import { styles } from "@/styles";

interface Params {
  id?: Post["id"];
  initialData?: UsePostProps["initialData"];
}

const PostPage: NextPage<Params> = ({ id, initialData }) => {
  const { data, isLoading } = usePost({
    id,
    initialData,
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

export const getStaticProps: GetStaticProps<Params> = async (context) => {
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
      initialData: {
        post,
      },
    },
    revalidate: 1,
  };
};
