"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CreateListingForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // ✅ Get logged-in user
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    }

    getUser();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      setError("You must be logged in to create a listing");
      return;
    }

    const { error } = await supabase.from("listings").insert({
      title,
      description,
      price: Number(price),
      user_id: userId,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Optional: reset form
    setTitle("");
    setDescription("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded cursor-pointer"
      >
        Create Listing
      </button>
    </form>
  );
}
