"use client"

import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import type { Key } from 'react';
import React from 'react'
import ErrorToast from './ErrorToast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Item } from '@/lib/schemas/strapi-schemas';
import { cn } from '@/lib/utils';

export default function SelectFilter({ 
  label,
  description,
  param,
  items, 
  hasMore,
  loading,
  isError,
  error,
  onLoadMore,
  className,
}: {
  label: string,
  description: string,
  param: string,
  items: Array<Item>, 
  hasMore: boolean,
  loading: boolean,
  isError: boolean,
  error: Error | null,
  onLoadMore: () => void,
  className?: string,
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });
  
  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentParam = searchParams.get(param) ?? undefined

  const handleSelectParams = React.useCallback(
    (key: Key | null) => {

      const params = new URLSearchParams(window.location.search);
  
      if (!!key && key.toString().length > 0) {

        params.set(param, key.toString());
      } else {
        params.delete(param);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, pathname, router],
  );

  if (isError && error) {
    return (
      <ErrorToast
        error={error?.message}
        place={label}
      />
    )
  }

  return (
    <>
      <Autocomplete
        defaultItems={items}
        defaultSelectedKey={currentParam}
        label={label}
        description={description}
        scrollRef={scrollerRef}
        isLoading={loading || isPending}
        allowsCustomValue
        onOpenChange={setIsOpen}
        onSelectionChange={handleSelectParams}
        variant="underlined"
        classNames={{popoverContent: "bg-background border border-border"}}
        className={cn(
          "autocomplete max-w-sm lg:min-w-[40vw] min-w-[65vw]",
          className
        )}
      >
        {(item) => (
          <AutocompleteItem key={item.attributes.title} className="capitalize" color="secondary">
            {item.attributes.title}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}
