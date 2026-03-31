"use client";

import { Button } from "@my-better-t-app/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@my-better-t-app/ui/components/dropdown-menu";
import { Skeleton } from "@my-better-t-app/ui/components/skeleton";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  if (!session) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  const firstInitial = session.user.name?.charAt(0).toUpperCase() || "U";

  return (
   <DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline" size="icon" className="rounded-full">
      {firstInitial}
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-64">

    <DropdownMenuGroup>
      <DropdownMenuLabel className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {firstInitial}
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
      </DropdownMenuLabel>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuGroup>
      <DropdownMenuItem className="gap-2">
        <UserCircle className="h-4 w-4" />
        Profile
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuGroup>
      <DropdownMenuItem
        className="gap-2 text-destructive"
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/login"),
            },
          });
        }}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuGroup>

  </DropdownMenuContent>
</DropdownMenu>
  );
}