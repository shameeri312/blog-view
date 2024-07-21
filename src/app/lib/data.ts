import { sql } from "@vercel/postgres";
import { Categories, Posts, Preview } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export async function fetchBlogs(category_id: number) {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log("Fetching: " + category_id);
    const data =
      category_id > 0
        ? await sql<Posts>`
      SELECT 
        posts.*, 
        users_a.username AS user_name, 
        categories.name AS category_name
      FROM 
        posts
      JOIN 
        users_a ON posts.user_id = users_a.user_id
      JOIN 
        categories ON posts.category_id = categories.category_id
      WHERE posts.category_id = ${category_id}
      ORDER BY posts.post_id
    `
        : await sql<Posts>`
      SELECT 
        posts.*, 
        users_a.username AS user_name, 
        categories.name AS category_name
      FROM 
        posts
      JOIN 
        users_a ON posts.user_id = users_a.user_id
      JOIN 
        categories ON posts.category_id = categories.category_id
      ORDER BY posts.post_id
    `;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchCategories() {
  try {
    const data = await sql<Categories>`
    SELECT * FROM categories;`;
    return data.rows || [];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchBlog(id: number) {
  try {
    console.log("Fetching...");

    const data = await sql<Preview>`SELECT 
        posts.title, posts.content, posts.created_at,
        users_a.username AS user_name, 
        categories.name AS category_name
      FROM 
        posts
      JOIN 
        users_a ON posts.user_id = users_a.user_id
      JOIN 
        categories ON posts.category_id = categories.category_id
      WHERE post_id = ${id}`;
    console.log("Fetched Data is:");
    const title = data.rows[0].title;
    const content = data.rows[0].content;
    const created_at = data.rows[0].created_at;
    const user_name = data.rows[0].user_name;
    const category_name = data.rows[0].category_name;
    const date = format(new Date(created_at), "MMMM d, yyyy HH:mm");
    return {
      title,
      content,
      date,
      user_name,
      category_name,
    };
  } catch (error) {
    console.error("Database Error:", error);
  }
}
