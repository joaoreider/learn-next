"use client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
export default function SnippetCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            id="title"
            className="border rounded p-2 w-full"
            type="text"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="border rounded p-2 w-full"
          />
        </div>
        {formState.message && (
          <div className="bg-red-200 m-2 p-2 border rounded border-red-400">
            {formState.message}
          </div>
        )}

        <button className="rounded p-2 bg-blue-200" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
