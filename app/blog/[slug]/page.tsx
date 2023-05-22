import "./highlightjs.scss";
import { allBlogs } from "contentlayer/generated";
import { TypographyH1, TypographyMuted } from "@/components/ui/Typography";
import { CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
import Content from "./content";
// import NotFound from "@/app/[...slug]/page";
import { Metadata } from "next";
// import { metadata as notFoundMetadata } from "@/app/[...slug]/page";
import makeMetadata from "@/lib/makeMetadata";
import { siteConfig } from "@/constants/site";
// import ViewCounter from "../views";

type BlogPostParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostParams): Metadata {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    // return notFoundMetadata;
    return makeMetadata("asd", "asd");
  }

  return {
    ...makeMetadata(
      post.title,
      `Read more about "${post.title}" on Podter's blog`
    ),
    openGraph: {
      type: "article",
      url: siteConfig.url + post.url,
    },
  };
}

export default function Page({ params }: BlogPostParams) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    // return <NotFound />;
    return null;
  }

  return (
    <>
      <TypographyH1>{post.title}</TypographyH1>
      <div className="flex flex-row w-full gap-2 mt-6">
        {/* <ViewCounter slug={post.slug} trackView /> */}
        <TypographyMuted>
          <CalendarDays
            className="inline mr-1 align-[-0.125em] h-[14px] w-[14px]"
            size={14}
          />
          Published on {format(parseISO(post.date), "do MMMM, yyyy")}
        </TypographyMuted>
      </div>
      <Content code={post.body.code} />
    </>
  );
}