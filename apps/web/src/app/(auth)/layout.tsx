import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@my-better-t-app/auth";

// Metadata for auth pages
export const metadata: Metadata = {
  title: "Authentication - Posts CRUD App",
  description: "Sign in or create an account",
};

// Layout for auth pages (login/signup)
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();

  // If user is already logged in, redirect to home
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-screen">
      {children}
    </div>
  );
}
