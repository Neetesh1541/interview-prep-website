"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { UserNav } from "@/components/user-nav"
import { UserRound, Sparkles } from "lucide-react"

export function Header() {
  const { user, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1.5">
              <UserRound className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">Neetesh</span>
              <span className="text-xs text-muted-foreground -mt-1">Your Personal Interviewer</span>
            </div>
            <div className="hidden sm:flex items-center ml-1">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-1">
                AI-Powered
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/practice" className="text-sm font-medium transition-colors hover:text-primary">
              Practice
            </Link>
            <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            {!isLoading && (
              <>
                {user ? (
                  <UserNav user={user} />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/signin">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
