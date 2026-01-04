"use client";

import { useSearchParams } from "next/navigation";

export function StatusBanner() {
  const params = useSearchParams();
  const status = params.get("status");

  if (!status) return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`mb-6 rounded p-4 text-sm ${
        isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isSuccess
        ? "Your item was posted successfully!"
        : "Something went wrong. Please try again."}
    </div>
  );
}
