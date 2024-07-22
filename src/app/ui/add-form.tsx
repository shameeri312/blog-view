"use client";

import React, { useState } from "react";
import { Categories } from "../lib/definitions";
import { createBlog } from "../lib/actions";
import axios from "axios";

interface AddFormProps {
  categories: Categories[];
  name: string;
}

const AddForm = ({ categories }: AddFormProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const res = await axios.post("/api/upload", formData);
      const name = file?.name;
      await createBlog(formData, name || "");
      console.log(res.data);
    } catch (error) {
      throw new Error("Error in uploading!");
    }
  };

  return (
    <div className="w-full px-5">
      <form
        onSubmit={upload}
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
        <label className="w-full flex items-center text-sm justify-between tracking-wide p-5 rounded-lg bg-gray-100 gap-3">
          <span className="opacity-60">Upload an image:</span>
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <textarea
          name="content"
          id="newBlog"
          className="w-full outline-none h-80 rounded-lg p-5 bg-gray-100"
          required
          placeholder="Your blog here..."
        ></textarea>
        <button
          className="w-full bg-slate-500 py-5 text-white rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
