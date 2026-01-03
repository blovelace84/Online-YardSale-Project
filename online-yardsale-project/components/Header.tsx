import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Tee Dee St. Yard Sale
        </Link>
        <nav className="flex gap-4">
          <Link href="/sell" className="text-sm font-medium">
            Sell an item
          </Link>
        </nav>
      </div>
    </header>
  );
}
