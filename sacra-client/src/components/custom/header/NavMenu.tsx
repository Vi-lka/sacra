"use client";

import React from 'react';
import LogoSvg from '../LogoSvg'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link as NextUILink } from '@nextui-org/react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const [bg, setBg] = React.useState(false);

  React.useEffect(() => {
    if (position > 40 || isMenuOpen) setBg(true)
    else setBg(false)
  }, [isMenuOpen, position])

  return (
    <Navbar 
      onScrollPositionChange={setPosition} 
      onMenuOpenChange={setIsMenuOpen} 
      isBlurred={false}
      isBordered={bg}
      className={cn(
        "navbar w-full fixed z-50 transition-all",
        bg ? "bg-background/95 lg:py-0.5" : "bg-transparent lg:py-2"
      )} 
      classNames={{
        item: [
          "relative h-full flex items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[1px]",
          "data-[active=true]:after:rounded-[1px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link
            href={`/`}
            className="relative flex items-center w-fit h-[2.5rem] md:h-[3.5rem] hover:scale-125 transition-all"
          >
            <LogoSvg className='max-w-[1.8rem]' />
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavMenuItem url="/" text='Главная' isBG={bg} />
        <NavMenuItem url="/catalog" text='Каталог' />
        <NavMenuItem url="/map" text='Карта' />
        {/* <NavMenuItem url="/tour" text='Панорамы' /> */}
      </NavbarContent>
      
      {/* Mobile */}
      <NavbarMenu className='pt-12 bg-background/95'>
          <NavbarMenuItem>
            <NextUILink color="foreground" className="w-full font-medium text-lg mb-6" href="/" size="lg">
              Главная
            </NextUILink>
            <NextUILink color="foreground" className="w-full font-medium text-lg mb-6" href="/catalog" size="lg">
              Каталог
            </NextUILink>
            <NextUILink color="foreground" className="w-full font-medium text-lg mb-6" href="/map" size="lg">
              Карта
            </NextUILink>
            {/* <NextUILink color="foreground" className="w-full font-medium text-lg mb-6" href="/tour" size="lg">
              Панорамы
            </NextUILink> */}
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
  
function NavMenuItem({
    text,
    url,
    isBG
  }: {
    text: string,
    url: string,
    isBG?: boolean,
  }) {
    const pathName = usePathname();
  
    // Remove query parameters
    const pathWithoutQuery = pathName.split("?")[0];
  
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const pathNestedRoutes = pathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);
  
    const isMainPage = pathNestedRoutes[pathNestedRoutes.length  - 1] === undefined
    const pathCurrentPage = isMainPage ? "/" : "/" + pathNestedRoutes[0];
  
    return (
      <NavbarItem isActive={isMainPage ? isBG : pathCurrentPage === url}>
        <Link href={url} passHref>
          <Button color="primary" variant="light" radius='sm'>
            {text}
          </Button>
        </Link>
      </NavbarItem>
    );
}