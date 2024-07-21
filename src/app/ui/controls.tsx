import { fetchCategories } from "../lib/data";
import React from "react";
import Button from "./button";

const Controls = async () => {
  const categories = await fetchCategories();

  return (
    <div>
      <ul className="flex flex-wrap gap-2 sm:gap-5 justify-center pt-10 px-10">
        <Button category_id={0} name={"All"} />
        {categories?.map((category, i) => {
          return (
            <Button
              key={i}
              category_id={category.category_id}
              name={category.name}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Controls;
