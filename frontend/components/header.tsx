//use clients
"use client"
import ScrollGlassNav from "./scroll-glass-nav"
import { useAuth } from "../lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
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
import { Settings, ShoppingBag, LogOut, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useConsultationPopup } from "@/lib/consultation-popup-context"

export default function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { openWorkflowAnalysis, openConsultationPopup } = useConsultationPopup()

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
            <button
              onClick={(e) => {
                e.preventDefault()
                // Check if we're on services page, open consultation popup, otherwise go to showcase
                if (pathname === "/services") {
                  openConsultationPopup()
                } else {
                  router.push("/#showcase")
                }
              }}
              className="hover:opacity-80 transition cursor-pointer"
            >
              Demo
            </button>
            {!user && (
              <Link
                href="/login"
                className="hover:opacity-80 transition"
              >
                Login
              </Link>
            )}
            <button
              onClick={(e) => {
                e.preventDefault()
                openWorkflowAnalysis()
              }}
              className="btn btn-primary glow-teal !px-3 !py-1.5 text-xs md:!px-3 md:!py-1.5 md:text-sm text-white"
            >
              Book Free Consultation
            </button>
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
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2 hover:opacity-80 transition" aria-label="Open menu">
                <Menu className="h-6 w-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-neutral-900 text-white border-neutral-800">
              <nav className="flex flex-col gap-6 mt-8">
                <Link href="/services" className="text-lg hover:opacity-80 transition">
                  Services
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    // Check if we're on services page, open consultation popup, otherwise go to showcase
                    if (pathname === "/services") {
                      openConsultationPopup()
                    } else {
                      router.push("/#showcase")
                    }
                  }}
                  className="text-lg hover:opacity-80 transition text-left"
                >
                  Demo
                </button>
                {!user && (
                  <Link
                    href="/login"
                    className="text-lg hover:opacity-80 transition"
                  >
                    Login
                  </Link>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    openWorkflowAnalysis()
                  }}
                  className="btn btn-primary glow-teal !px-4 !py-2 text-sm text-white w-fit"
                >
                  Book Free Consultation
                </button>
                {user && (
                  <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                        <AvatarFallback className="bg-teal-500/20 text-white text-sm font-semibold">
                          {user.email ? getInitials(user.email) : <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">My Account</p>
                        <p className="text-xs text-neutral-400 truncate max-w-[200px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard/settings" 
                      onClick={(e) => handleProtectedNavigation("/dashboard/settings", e)}
                      className="flex items-center gap-2 text-base hover:opacity-80 transition"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                    <Link 
                      href="/dashboard/purchases"
                      onClick={(e) => handleProtectedNavigation("/dashboard/purchases", e)}
                      className="flex items-center gap-2 text-base hover:opacity-80 transition"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      My Purchases
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-base text-red-400 hover:opacity-80 transition text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <ScrollGlassNav />
    </>
  )
}
