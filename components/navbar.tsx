"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

export const Navbar = () => {
  const pathname = usePathname();

  const isScrolled = useScroll();

  const routes: { title: string; href: string; active: boolean }[] = [
    {
      title: "Home",
      href: "/",
      active: pathname !== "/movies" && pathname !== "/tv",
    },
    {
      title: "Movies",
      href: "/movies",
      active: pathname === "/movies",
    },
    {
      title: "TV Series",
      href: "/tv",
      active: pathname === "/tv",
    },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 h-16 w-full bg-transparent transition",
        isScrolled && "bg-background",
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        <NavigationMenu>
          <Button
            variant="ghost"
            size="icon"
            className="mr-6 rounded-full md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold md:mr-6 lg:text-3xl">
            Cine<span className="text-destructive">View</span>
          </h1>
          <NavigationMenuList className="hidden md:flex">
            <NavigationMenuItem className="flex items-center space-x-2">
              {routes.map((route) => (
                <Link
                  key={route.title}
                  href={route.href}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      "select-none rounded-md p-3 text-sm font-medium uppercase leading-none no-underline outline-none transition-colors hover:bg-accent",
                      route.active &&
                        "bg-destructive text-primary-foreground hover:bg-destructive/80",
                    )}
                  >
                    {route.title}
                  </NavigationMenuLink>
                </Link>
              ))}
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="destructive"
          className="h-9 px-3 uppercase md:h-10 md:px-4 md:py-2"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};
