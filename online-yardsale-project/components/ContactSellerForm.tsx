"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
type Props = {
  itemId: string;
  onSuccess?: () => void;
};

export function ContactSellerForm({ itemId, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendContactMessage({
        itemId,
        buyerName: name,
        buyerContact: contact,
        message,
      });

      setLoading(false);
      onSuccess?.();
    } catch (err) {
      setError("Failed to send message");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border p-2"
      />

      <input
        placeholder="Your email or phone (optional)"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="w-full rounded border p-2"
      />

      <textarea
        required
        placeholder="Message to the seller"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded border p-2"
        rows={4}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded bg-black py-2 text-white disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
