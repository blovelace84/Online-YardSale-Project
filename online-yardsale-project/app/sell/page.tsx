"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SellPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let imageUrl: string | null = null;

    // 1. Upload image if provided
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("items")
        .upload(fileName, image);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      // 2. Get public URL
      const { data } = supabase.storage.from("items").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    // 3. Insert item into DB
    const { error: insertError } = await supabase.from("items").insert({
      title: name,
      price: Number(price),
      description,
      contact,
      image_url: imageUrl,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setContact("");
    setImage(null);

    alert("Item posted!");
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sell an Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <input
          required
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Price */}
        <input
          required
          type="number"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border p-2"
          rows={4}
        />

        {/* Contact */}
        <input
          placeholder="Contact info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded border p-2"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-black text-white py-2 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Item"}
        </button>
      </form>
    </div>
  );
}
