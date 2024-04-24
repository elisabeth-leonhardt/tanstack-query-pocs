import Image from "next/image";
import headshot from "../assets/eli.webp";
import Link from "next/link";
import { Chevron } from "@/components/Icons";

const pages = [
  {
    linktext: "Simple Queries",
    link: "/simpleQueries",
    id: 0,
  },
  {
    linktext: "Filters with API query parameters",
    link: "/filters",
    id: 1,
  },
  {
    linktext: "TanStack Query with custom hooks",
    link: "/customHook",
    id: 2,
  },
  {
    linktext: "Dependent Queries",
    link: "/dependentQueries",
    id: 3,
  },
  {
    linktext: "Debounced Query",
    link: "/debounce",
    id: 4,
  },
  {
    linktext: "Placeholder data and initial data",
    link: "/placeholderAndInitialData",
    id: 5,
  },
  // I couldn't make this work yet
  // {
  //   linktext: "Query prefetching",
  //   link: "/prefetchQuery",
  //   id: 6,
  // },
  {
    linktext: "Mutation with refetch",
    link: "/mutationWithRefetch",
    id: 7,
  },
  {
    linktext: "Mutation with manual cache update (without refetch)",
    link: "/mutationWithoutRefetch",
    id: 8,
  },
  {
    linktext: "Mutation with optimistic update",
    link: "/mutationWithOptimisticUpdate",
    id: 9,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl m-[auto]">
      <div className="py-10 px-4 flex justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold tanstack-query-gradient py-2 flex-1">
          TanStack Query Examples
        </h1>
        <Link href="https://dev.to/elisabethleonhardt">
          <Image
            src={headshot}
            alt="my boring headshot"
            width={100}
            height={100}
            className="rounded-full"
          ></Image>
          <span className="text-center block">By Eli</span>
        </Link>
      </div>
      <div className="py-10 px-4">
        <ul className="flex flex-col gap-2 pl-4">
          {pages.map((page) => (
            <li key={page.id} className="list-decimal">
              <Link href={page.link} className="hover:underline text-lg flex">
                <span>{page.linktext}</span>
                <Chevron></Chevron>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
