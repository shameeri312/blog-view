import { fetchBlogs } from "../lib/data";
import { format } from "date-fns";
import Card from "./card";

export const CardWrapper = async ({ id }: { id: number }) => {
  const blogs = await fetchBlogs(id);

  return (
    <div className="container mx-auto gap-5 px-5 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {blogs?.map((blog) => {
        return (
          <div key={blog.post_id}>
            <Card
              title={blog.title}
              content={blog.content}
              user_name={blog.user_name}
              category_name={blog.category_name}
              post_id={blog.post_id}
              user_id={0}
              created_at={format(new Date(blog.created_at), "MMMM d, yyyy")}
              updated_at={""}
              category_id={0}
            />
          </div>
        );
      })}
    </div>
  );
};
