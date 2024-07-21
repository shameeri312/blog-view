import React from "react";
import AddForm from "../ui/add-form";
import { satisfy } from "../ui/fonts";
import clsx from "clsx";
import { fetchCategories } from "../lib/data";

const AddBlog = async () => {
  const categories = await fetchCategories();
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1
        className={clsx(
          `text-2xl sm:text-3xl lg:text-5xl inline`,
          satisfy.className
        )}
      >
        Add new blog
      </h1>
      <AddForm categories={categories ?? []} />
    </div>
  );
};

export default AddBlog;
