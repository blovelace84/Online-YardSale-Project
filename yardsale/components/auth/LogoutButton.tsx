"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-700 hover:text-gray-900"
    >
      Logout
    </button>
  );
}
