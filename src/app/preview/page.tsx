import React from "react";
import {
  FaChevronLeft,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { fetchBlog } from "../lib/data";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    view?: string;
  };
}) => {
  const id = Number(searchParams?.view);
  const post = await fetchBlog(id);
  const socialIcons = [
    { icon: <FaXTwitter /> },
    { icon: <FaFacebook /> },
    { icon: <FaInstagram /> },
    { icon: <FaLinkedin /> },
  ];
  console.log(post);
  console.log("The post is:" + id);
  return (
    <div className="container mx-auto flex items-center flex-col">
      <Link
        href={"/"}
        className="flex border border-slate-500 px-4 py-2 hover:text-white hover:border-transparent hover:bg-slate-500 rounded-full items-center gap-2"
      >
        <FaChevronLeft className="text-base" />
        <h2>Go back</h2>
      </Link>

      <div className="py-10 w-full lg:w-3/4 xl:w-2/3 flex flex-col gap-3 px-6">
        <h1 className="py-5 font-bold text-3xl md:text-5xl">{post?.title}</h1>
        <Image
          src={"/blog-img.jpg"}
          alt="blog-img"
          className="w-full h-[250px] sm:h-[400px] xl:h-[600px] object-cover"
          width={10000}
          height={100}
        />
        <div className="flex gap-3 items-center pt-5">
          <strong className="tracking-wide">Category: </strong>
          <h4 className="tracking-wide px-3 py-[2px] bg-slate-500 rounded-full text-white">
            {post?.category_name}{" "}
          </h4>
        </div>
        <div className="content py-4">
          <p className="text-base sm:text-xl">{post?.content}</p>
        </div>
        <div className="border-t-2 flex flex-col gap-4 sm:flex-row justify-between items-center py-3">
          <h4 className="font-semibold text-xl ">Share this post:</h4>
          <ul className="flex gap-4 items-center">
            {socialIcons?.map((icon, i) => {
              return (
                <li
                  key={i}
                  className="cursor-pointer transition-all p-3 hover:text-white hover:bg-slate-500  border text-slate-500 text-2xl rounded-xl"
                >
                  {icon.icon}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-2 justify-center">
          <strong className="tracking-wide">Posted at: </strong>
          <h5>{post?.date}</h5>
        </div>
      </div>
    </div>
  );
};

export default Page;
