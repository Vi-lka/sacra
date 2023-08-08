"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from 'react-icons/hi';
import LogoSvg from "../LogoSvg";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NavSheet() {

  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <HiMenu className="h-[2.5rem] w-[2.5rem] transition-all" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5 flex justify-center">
            <Link
              href={`/`}
              className="relative flex items-center h-[2.5rem] w-[7rem] md:h-[3rem]"
            >
              <SheetClose className="flex items-center justify-center w-full">
                <LogoSvg />
              </SheetClose>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <NavigationMenu orientation="vertical" className="mx-auto">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Inter mt-[2vh] h-[72vh] w-full p-1">
                <SheetMenuItem text={'Главная'} url={'/'} />
                <SheetMenuItem text={'Каталог'} url={'/catalog'} />
                <SheetMenuItem text={'Карта'} url={'/map'} />
                <SheetMenuItem text={'Публикации'} url={'/publications'} />
                <SheetMenuItem text={'О проекте'} url={'/about'} />
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

function SheetMenuItem({
    text,
    url,
}: {
    text: string,
    url: string
}) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  // Remove locale
  const pathCurrentPage = (pathNestedRoutes[pathNestedRoutes.length] === undefined) ? "/" : pathNestedRoutes[pathNestedRoutes.length];

    return (
      <div className="mb-1 mt-6 flex w-full gap-1 py-2">
        <ul className="flex flex-col justify-center">
            <li>
              <Link href={url} legacyBehavior passHref>
                <NavigationMenuLink
                  active={pathCurrentPage === url}
                  className={navigationMenuTriggerStyle()}
                >
                  <SheetClose className="space-y-1 px-3 py-2 text-left">
                    <div className="text-dark dark:text-foreground text-base font-medium leading-none md:text-lg">
                      {text}
                    </div>
                  </SheetClose>
                </NavigationMenuLink>
              </Link>
            </li>
        </ul>
      </div>
    );
}
