"use server";

import { sql } from "@vercel/postgres";
import { sq } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string(),
  categoryId: z.coerce.number(),
  content: z.string(),
});

export async function createBlog(formData: FormData) {
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

  // Test it out:
  console.log({ title, categoryId, content });

  // Here you would typically handle the database insert
  // For example:
  try {
    const res =
      await sql`INSERT INTO POSTS (user_id, title, content, category_id)
                VALUES (1, ${title}, ${content}, ${categoryId})`;
    console.log(res);
  } catch (error) {
    console.log({ "Database error: ": error });
  }

  revalidatePath("/addBlog");
  redirect("/");
}
