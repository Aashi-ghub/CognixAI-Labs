//use clients
"use client"
import ScrollGlassNav from "./scroll-glass-nav"
import { useAuth } from "../lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Settings, ShoppingBag, LogOut, User } from "lucide-react"

export default function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  const handleProtectedNavigation = (path: string, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      router.push("/login")
      return
    }
  }

  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="CognixAI Labs" 
              className="h-8 w-auto"
            />
            <span className="font-semibold tracking-tight">
              CognixAI Labs
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 md:ml-auto md:justify-end">
            <Link href="/services" className=" hover:opacity-80 transition">
              Services
            </Link>
            <a href="#demo" className=" hover:opacity-80 transition">
              Demo
            </a>
            {!user && (
              <Link
                href="/login"
                className="hover:opacity-80 transition"
              >
                Login
              </Link>
            )}
            <a
              href="#contact"
              className="btn btn-primary glow-teal !px-3 !py-1.5 text-xs md:!px-3 md:!py-1.5 md:text-sm text-white"
            >
              Book Free Consultation
            </a>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none focus:outline-none">
                    <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                      <AvatarFallback className="bg-teal-500/20 text-white text-xs font-semibold">
                        {user.email ? getInitials(user.email) : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-neutral-900 dark:text-white">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground truncate text-neutral-600 dark:text-neutral-400">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/dashboard/settings" 
                      onClick={(e) => handleProtectedNavigation("/dashboard/settings", e)}
                      className="cursor-pointer text-neutral-900 dark:text-white focus:bg-neutral-100 dark:focus:bg-neutral-800"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/dashboard/purchases"
                      onClick={(e) => handleProtectedNavigation("/dashboard/purchases", e)}
                      className="cursor-pointer text-neutral-900 dark:text-white focus:bg-neutral-100 dark:focus:bg-neutral-800"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      My Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </header>
      <ScrollGlassNav />
    </>
  )
}
