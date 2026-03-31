import Header from "@/components/header"
import { auth } from "@my-better-t-app/auth"
import { redirect } from "next/navigation"
import type React from "react"

export default async function HomeLayout({children}:{children: React.ReactNode}) {
  const session = await auth.api.getSession({
    headers: new Headers(),
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
