"use server";

import { sql } from "@vercel/postgres";
import { sq } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

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
  const file = formData.get("file") as File;
  const name = file.name;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  // Generate a new filename
  const newFileName = `${Date.now()}-${file.name}`;
  const filePath = path.join("./public", newFileName);

  await fs.writeFile(filePath, buffer);
  console.log(name);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { title, categoryId, content } = result.data;

  // Test it out:
  console.log({ title, categoryId, content });

  try {
    const res =
      await sql`INSERT INTO POSTS (user_id, title, content, category_id, image)
                VALUES (1, ${title}, ${content}, ${categoryId}, ${newFileName})`;
    console.log(res);
  } catch (error) {
    console.log({ "Database error: ": error });
  }

  revalidatePath("/");
  redirect("/");
}
