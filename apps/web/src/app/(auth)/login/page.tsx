"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/lib/auth-client";

import Loader from "@/components/loader";
import SignInForm from "@/components/sign-in-form";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (isPending) {
    return <div className=" w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>;
  }

  if (session) {
    return null;
  }

  return <SignInForm />;
}
