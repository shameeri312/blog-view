"use client";
import Image from "next/image";
import React from "react";
import { FaBookmark } from "react-icons/fa6";
import { getFirst20Words } from "../lib/utils";
import { Posts } from "../lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Card = ({
  title,
  post_id,
  content,
  user_name,
  category_name,
  created_at,
}: Posts) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log("The path is: " + pathname);
  const router = useRouter();

  const handleClick = (post_id: number) => {
    const params = new URLSearchParams(searchParams);

    if (post_id) {
      // Set the "view" parameter to the post ID
      params.set("view", JSON.stringify(post_id));
      // Navigate to the preview page with the new query parameter
      router.push(`/preview?${params.toString()}`);
    } else {
      // Remove the "view" parameter if no post ID
      params.delete("view");
    }

    // Replace the current URL with the updated one
    router.replace(`/preview/?${params.toString()}`);
  };

  return (
    <div
      className=" border bg-slate-100/0 border-slate-600/20 shadow-lg shadow-slate-400/50  rounded-xl overflow-hidden"
      onClick={() => handleClick(post_id)}
    >
      <Image
        src={"/blog-img.jpg"}
        className="object-cover h-[200px]"
        onClick={() => handleClick(post_id)}
        alt="blog-img"
        width={1000}
        height={0}
      />
      <div
        className={`cursor-pointer flex flex-col items-start justify-between gap-2 p-4 h-full `}
      >
        <div className="flex flex-col items-start gap-2">
          <h3 className="bg-slate-500 py-[1px] px-3 rounded-full text-sm text-white sm:text-base md:text-base">
            {category_name}
          </h3>
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">{title}</h1>
        </div>
        <div className="h-full">
          <p className="text-[13px] sm:text-sm md:text-base">
            {getFirst20Words(content)}
          </p>
        </div>
        <p className="w-full border my-4"></p>
        <div className="flex gap-2 justify-between w-full">
          <Image src={"/user.svg"} alt="user icon" width={32} height={32} />
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold capitalize sm:text-base">
                {user_name}
              </h2>
              <span className="text-xs">{created_at}</span>
            </div>
            <FaBookmark className="text-slate-600/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
