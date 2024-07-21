"use client";

import React from "react";
import { Categories } from "../lib/definitions";
import { createBlog } from "../lib/actions";

interface AddFormProps {
  categories: Categories[];
}

const AddForm = ({ categories }: AddFormProps) => {
  return (
    <div className="w-full px-5">
      <form
        action={createBlog}
        className="flex flex-col items-center md:w-3/4 xl:w-2/5 mx-auto gap-5 py-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="bg-gray-100 rounded-md w-full p-5 outline-none"
          required
        />
        <div className="bg-gray-100 relative cursor-pointer rounded-md px-5 w-full">
          <select
            id="category"
            name="categoryId"
            className="peer bg-gray-100 outline-none cursor-pointer py-5 block w-full text-sm "
            required
            defaultValue=""
          >
            <option value="">Select a category</option>
            {categories?.map((category, index) => (
              <option key={index} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="content"
          id="newBlog"
          className="w-full outline-none h-80 rounded-lg p-5 bg-gray-100"
          required
          placeholder="Your blog here..."
        ></textarea>
        <button className="w-full bg-slate-500 py-5 text-white rounded-lg">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
