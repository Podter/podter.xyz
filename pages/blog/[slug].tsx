import Head from "next/head";
import Container from "@/components/Container";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { format, parseISO } from "date-fns";
import { Eye, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import Mdx from "@/components/Mdx";

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  post: Post | undefined;
}> = async ({ params }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  );
  return {
    props: {
      post,
    },
  };
};

export default function BlogLayout({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>Blog | Podter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <h1 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-ctp-red to-ctp-blue bg-clip-text text-transparent">
            {post.title}
          </span>
        </h1>
        <div className="flex flex-row gap-2 pt-5">
          <p className="text-sm text-ctp-subtext0">
            <Eye
              className="inline mr-1 align-[-0.125em] h-[14px] w-[14px]"
              size={14}
            />
            {123} views
          </p>
          <p className="text-sm text-ctp-subtext0">
            <CalendarDays
              className="inline mr-1 align-[-0.125em] h-[14px] w-[14px]"
              size={14}
            />
            Published on {format(parseISO(post.date || ""), "do MMMM, yyyy")}
          </p>
        </div>
        <div className="divider" />
        <Mdx code={post.body.code} />
      </Container>
    </>
  );
}