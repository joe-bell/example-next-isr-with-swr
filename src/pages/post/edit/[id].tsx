import * as React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AppShell } from "@/components/app-shell";
import { usePost, UsePostProps } from "@/hooks/use-post";
import { getAllPosts, getPost, Post } from "@/lib/db";
import { styles } from "@/styles";
import { useAllPosts } from "@/hooks/use-all-posts";

interface Params {
  id?: Post["id"];
  initialData?: UsePostProps["initialData"];
}

interface FormInputs extends Post {}

const PostEditPage: NextPage<Params> = ({ id, initialData }) => {
  const router = useRouter();
  const { data, isLoading, mutate } = usePost({
    id,
    initialData,
  });
  const { mutate: mutateAllPosts } = useAllPosts();

  const post = !isLoading && data.post;

  const form = useForm<FormInputs>({ defaultValues: post });

  return (
    <AppShell>
      <header style={{ display: "flex", alignItems: "center" }}>
        <h1>
          <span className="block mt-1 text-lg text-gray-500">
            Editing Post<span className="sr-only">{": "}</span>
          </span>
          <span className={styles.h1}>
            {form.watch("title", post.title) || post.title}
          </span>
        </h1>
      </header>

      <form
        className="space-y-4 mt-6"
        onSubmit={form.handleSubmit((formData) => {
          const updatedPost = {
            ...post,
            ...formData,
          };

          mutate(
            {
              post: updatedPost,
            },
            false
          );

          mutateAllPosts((prevData) => {
            const updatedPosts = prevData.posts.map((prevDataPost) =>
              prevDataPost.id === id ? updatedPost : prevDataPost
            );

            return {
              posts: updatedPosts,
            };
          }, false);

          router.replace(`/post/${id}`);
        })}
      >
        <label className="block">
          <span className={styles.label}>Title</span>
          <input
            ref={form.register}
            name="title"
            type="text"
            className={styles.input}
          />
        </label>

        <label className="block">
          <span className={styles.label}>Content</span>
          <textarea
            ref={form.register}
            name="content"
            rows={6}
            className={styles.input}
          />
        </label>

        <div role="group" className="space-x-4">
          <button
            type="button"
            onClick={() => {
              router.back();
              form.reset();
            }}
            className={styles.button.secondary}
          >
            Cancel
          </button>
          <button type="submit" className={styles.button.primary}>
            Save Changes
          </button>
        </div>
      </form>
      <p className="text-sm mt-6 max-w-sm text-gray-600">
        Any changes made to content will be saved to the cache, whilst static
        pages (this post and the "Home" page) revalidate in the background.
        <small className="block mt-1">
          (in this example, content is only saved to the cache)
        </small>
      </p>
    </AppShell>
  );
};

export default PostEditPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPosts().then((posts) =>
    posts.map((post) => ({
      params: {
        id: post.id,
      },
    }))
  );

  return { paths, fallback: false };
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
