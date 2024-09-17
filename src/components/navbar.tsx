"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mystryfeedback
        </a>

        {/* Loading State */}
        {status === "loading" && (
          <span className="mr-4">Loading...</span>
        )}

        {/* If session is available, display user-specific content */}
        {session ? (
          <>
            <span className="mr-4">Welcome, {session.user?.username || "User"}</span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          // Show login button when no session
          status !== "loading" && (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto bg-slate-100 text-black" variant="outline">
                Login
              </Button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
