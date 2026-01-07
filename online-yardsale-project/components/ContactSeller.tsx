"use client";

import { useState } from "react";
import { ContactSellerForm } from "@/components/ContactSellerForm";

type Props = {
  itemId: string;
  contact?: string;
};

export function ContactSeller({ itemId, contact }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 rounded-xl border bg-gray-50 p-5">
      <p className="text-sm text-gray-500 mb-2">Contact seller</p>

      {contact && <p className="font-medium mb-4 break-all">{contact}</p>}

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-black px-5 py-3 text-white font-medium hover:bg-gray-800 transition"
        >
          Contact Seller
        </button>
      ) : (
        <ContactSellerForm itemId={itemId} onSuccess={() => setOpen(false)} />
      )}
    </div>
  );
}
