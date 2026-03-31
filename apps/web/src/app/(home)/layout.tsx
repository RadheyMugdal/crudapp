import Header from "@/components/header"
import { auth } from "@my-better-t-app/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type React from "react"

export default async function HomeLayout({children}:{children: React.ReactNode}) {
  const requestHeaders = await headers()

  const session = await auth.api.getSession({
    headers: requestHeaders,
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <main >
        <Header/>
        {children}
    </main>
  )
}
