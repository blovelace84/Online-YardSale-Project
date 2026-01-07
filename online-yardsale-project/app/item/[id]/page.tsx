import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

function getContactLink(contact: string) {
  const trimmed = contact.trim();

  if (trimmed.includes("@")) {
    return `mailto:${trimmed}`;
  }

  const digits = trimmed.replace(/[^\d+]/g, "");
  if (digits.length === 0) {
    return `tel:${digits}`;
  }

  return null;
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;

  const { data: item, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !item) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-block mb-6 text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to listings
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        {item.image_url && (
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>

          <p className="text-2xl font-semibold text-green-700 mt-2">
            ${item.price}
          </p>

          {item.description && (
            <p className="mt-6 text-gray-600 leading-relaxed">
              {item.description}
            </p>
          )}

          {item.contact && (
            <div className="mt-8 rounded-xl border bg-gray-50 p-5">
              <h1 className="text-sm text-gray-500 mb-2">Contact seller</h1>

              {/* <p className="font-medium-mb-4">{item.contact}</p> */}

              {getContactLink(item.contact) && (
                <a
                  href={getContactLink(item.contact)!}
                  className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-white font-white hover:bg-gray-800 transition"
                >
                  Contact Seller
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
