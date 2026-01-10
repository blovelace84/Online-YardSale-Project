import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          YardSale
        </Link>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>

          <Link href="/sell" className="text-gray-700 hover:text-gray-900">
            Sell
          </Link>

          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
            Dashboard
          </Link>

          <Link href="/login" className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
