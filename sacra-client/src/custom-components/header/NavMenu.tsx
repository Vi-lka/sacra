"use client";

import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavMenuItem text={"Главная"} url={'/'} />
        <NavMenuItem text={"Каталог"} url={'catalog'} />
        <NavMenuItem text={"Карта"} url={'map'} />
        <NavMenuItem text={"Публикации"} url={'publications'} />
        <NavMenuItem text={"О проекте"} url={'about'} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}
  
function NavMenuItem({
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
  
    const pathCurrentPage = (pathNestedRoutes[pathNestedRoutes.length  - 1] === undefined) ? "/" : pathNestedRoutes[pathNestedRoutes.length - 1];

    console.log(pathCurrentPage)
    console.log(url)
  
    return (
    <NavigationMenuItem>
        <Link href={url} legacyBehavior passHref>
            <NavigationMenuLink
                active={pathCurrentPage === url}
                className={navigationMenuTriggerStyle()}
            >
                <p className='text-base mx-2'>
                    {text}
                </p>
            </NavigationMenuLink>
        </Link>
    </NavigationMenuItem>
    );
}