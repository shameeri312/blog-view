"use server";

import { sql } from "@vercel/postgres";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string(),
  categoryId: z.coerce.number(),
  content: z.string(),
});

export async function createBlog(formData: FormData, name: string) {
  const result = FormSchema.safeParse({
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.error("Validation failed:", result.error);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { title, categoryId, content } = result.data;
  console.log(name);

  try {
    const res =
      await sql`INSERT INTO POSTS (user_id, title, content, category_id, image)
                VALUES (1, ${title}, ${content}, ${categoryId}, ${name})`;
    console.log(res);
  } catch (error) {
    console.log({ "Database error: ": error });
    console.log(error);
  }

  revalidatePath("/");
  redirect("/");
}
