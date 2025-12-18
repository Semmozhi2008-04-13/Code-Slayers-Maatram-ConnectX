"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Calendar,
  Home,
  Menu,
  MessageSquare,
  Search,
  Users,
  GraduationCap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CURRENT_USER } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/alumni", label: "Alumni", icon: Users },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/mentors", label: "Mentors", icon: MessageSquare },
];

export function SiteHeader() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          pathname === link.href
            ? "text-primary bg-accent"
            : "text-muted-foreground hover:bg-accent hover:text-primary",
          isMobile ? "text-base" : ""
        )}
      >
        <link.icon className="h-5 w-5" />
        <span>{link.label}</span>
      </Link>
    ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="Maatram ConnectX Logo" width={24} height={24} className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">Maatram ConnectX</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex items-center">
                 <Image src="/logo.png" alt="Maatram ConnectX Logo" width={24} height={24} className="h-6 w-6 text-primary" />
                 <span className="ml-2 font-bold font-headline">Maatram ConnectX</span>
              </div>
              <div className="mt-6 flex flex-col gap-2">{renderNavLinks(true)}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 md:w-64 lg:w-96"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">{renderNavLinks()}</nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Image
                  src={CURRENT_USER.avatarUrl}
                  alt={CURRENT_USER.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                  data-ai-hint="profile avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{CURRENT_USER.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {CURRENT_USER.headline}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={CURRENT_USER.profileUrl}>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
