import Link from "next/link";
import { Eye, CalendarDays } from "lucide-react";
import { Post } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";

type BlogPostProps = Post & {
  views: number;
};

export default function BlogPost({ title, date, url, views }: BlogPostProps) {
  return (
    <Link className="flex flex-col mb-1 hover:text-ctp-red" href={url}>
      <div className="w-full flex flex-col">
        <h2 className="text-base">{title}</h2>
        <div className="flex flex-row gap-2">
          <p className="text-sm text-ctp-subtext0">
            <Eye
              className="inline mr-1 align-[-0.125em] h-[14px] w-[14px]"
              size={14}
            />
            {views} views
          </p>
          <p className="text-sm text-ctp-subtext0">
            <CalendarDays
              className="inline mr-1 align-[-0.125em] h-[14px] w-[14px]"
              size={14}
            />
            Published on {format(parseISO(date), "do MMMM, yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
}