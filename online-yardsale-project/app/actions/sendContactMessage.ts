"use server"

import { Resend } from "resend"
import { supabase } from "@/lib/supabaseClient"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactMessage({
  itemId,
  buyerName,
  buyerContact,
  message,
}: {
  itemId: string
  buyerName: string
  buyerContact?: string
  message: string
}) {
  // 1️⃣ Get item info
  const { data: item } = await supabase
    .from("items")
    .select("title")
    .eq("id", itemId)
    .single()

  if (!item) {
    throw new Error("Item not found")
  }

  // 2️⃣ Save message to DB
  await supabase.from("messages").insert({
    item_id: itemId,
    buyer_name: buyerName,
    buyer_contact: buyerContact,
    message,
  })

  // 3️⃣ Send email
  await resend.emails.send({
    from: "Yard Sale <onboarding@resend.dev>",
    to: process.env.SELLER_EMAIL!,
    subject: `New message about "${item.title}"`,
    html: `
      <h2>New contact message</h2>
      <p><strong>Item:</strong> ${item.title}</p>
      <p><strong>From:</strong> ${buyerName}</p>
      <p><strong>Contact:</strong> ${buyerContact ?? "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  })
}
