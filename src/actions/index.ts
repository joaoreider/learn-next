"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  /*
  Check user's input.
  The default FormDataEntryValue is a special type that can be a string or a File so here we're assuming it's a string
  */
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) {
    return {
      message: "Please fill out all fields",
    };
  }
  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be at least 3 characters",
    };
  }

  if (typeof code !== "string" || code.length < 3) {
    return {
      message: "Code must be at least 3 characters",
    };
  }

  // Create a new snippet in the database
  try {
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}
