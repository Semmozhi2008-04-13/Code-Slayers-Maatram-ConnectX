
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Briefcase,
  Calendar,
  Home,
  Menu,
  MessageSquare,
  Search,
  Users,
  GraduationCap,
  LogOut,
  User as UserIcon,
  Settings,
  Network
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
import type { View } from '@/app/page';
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirebase } from "@/firebase";
import { signOut } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";


const navLinks = [
  { view: "feed" as View, label: "Feed", icon: Home },
  { view: "alumni" as View, label: "Alumni", icon: Users },
  { view: "students" as View, label: "Students", icon: GraduationCap },
  { view: "jobs" as View, label: "Jobs", icon: Briefcase },
  { view: "events" as View, label: "Events", icon: Calendar },
  { view: "mentors" as View, label: "Mentors", icon: MessageSquare },
];

type SiteHeaderProps = {
  activeView: View;
  navigate: (view: View, id?: string | null, query?: string | null) => void;
};


export function SiteHeader({ activeView, navigate }: SiteHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const { auth } = useFirebase();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate('search', null, searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
          title: "You have been logged out.",
          description: "Thank you for using Maatram ConnectX.",
      });
      // The main page component will handle redirection to login
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was an error logging you out. Please try again.",
      });
    }
  }
  
  const handleSettings = () => {
     toast({
        title: "Feature Coming Soon!",
        description: "We are working on the settings page.",
    });
  }

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button
        key={link.view}
        variant="ghost"
        onClick={() => navigate(link.view)}
        className={cn(
          "flex items-center justify-start gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
          activeView === link.view
            ? "text-primary bg-accent"
            : "text-muted-foreground hover:bg-accent hover:text-primary",
          isMobile ? "text-base w-full" : "lg:px-3"
        )}
      >
        <link.icon className="h-5 w-5" />
        <span className={cn(isMobile ? "" : "hidden lg:inline")}>{link.label}</span>
      </Button>
    ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-2 flex items-center md:mr-4">
          <Link href="/feed" className="flex items-center space-x-2">
            <Network className="h-6 w-6 text-primary" />
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
            <SheetContent side="left" className="w-60">
               <Link href="/feed" className="flex items-center">
                 <Network className="h-6 w-6 text-primary" />
                 <span className="ml-2 font-bold font-headline">Maatram ConnectX</span>
              </Link>
              <div className="mt-6 flex flex-col gap-2">{renderNavLinks(true)}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search people, jobs, content..."
                className="w-full pl-9 md:w-56 lg:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">{renderNavLinks()}</nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                {isUserLoading ? (
                  <Skeleton className="h-9 w-9 rounded-full" />
                ) : user && user.photoURL ? (
                   <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                ) : (
                  <UserIcon className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName || 'Welcome'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('profile', user?.uid)}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
