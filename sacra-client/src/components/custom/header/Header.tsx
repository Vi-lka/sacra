"use client"

import Link from 'next/link'
import React from 'react'
import LogoSvg from '../LogoSvg'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link as NextUILink } from '@nextui-org/react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const [bg, setBg] = React.useState(false);

  React.useEffect(() => {
    if (position > 10 || isMenuOpen) setBg(true)
    else setBg(false)
  }, [isMenuOpen, position])

  return (
          <Navbar 
            onScrollPositionChange={setPosition} 
            onMenuOpenChange={setIsMenuOpen} 
            isBlurred={false}
            isBordered={bg}
            className={cn(
              "navbar w-full font-Inter fixed z-50 transition-all",
              bg ? "bg-background/95 lg:py-1" : "bg-transparent lg:py-3"
            )} 
          >
            <NavbarContent>
              <NavbarBrand>
                <Link
                  href={`/`}
                  className="relative flex items-center h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
                >
                  <LogoSvg />
                </Link>
              </NavbarBrand>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
            </NavbarContent>
        
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link href="/" passHref>
                  <Button color="primary" variant="light" radius='sm'>
                    Главная
                  </Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/catalog" passHref>
                  <Button color="primary" variant="light" radius='sm'>
                    Каталог
                  </Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/map" passHref>
                  <Button color="primary" variant="light" radius='sm'>
                    Карта
                  </Button>
                </Link>
              </NavbarItem>
            </NavbarContent>
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
                </NavbarMenuItem>
            </NavbarMenu>
          </Navbar>
  )
}
