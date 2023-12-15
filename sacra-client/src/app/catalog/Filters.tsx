"use client"

import SelectFilter from '@/components/custom/ui/SelectFilter'
import { useArchitectsList } from '@/lib/queries/strapi-client'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Filter } from 'lucide-react'
import React from 'react'

export default function Filters() {
  const architects = useArchitectsList();

  return (
    <Popover
      shouldBlockScroll
      backdrop="opaque"
      placement="left-start"
      classNames={{
        content: "py-3 px-3 bg-background",
      }}
    >
      <PopoverTrigger>
        <Button 
          variant="light"
          radius="sm"
          color="primary"
          className="w-fit min-w-max px-2 py-4" 
        >
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filters">
        <SelectFilter
          label="Архитектор"
          description="Выберите Архитектора"
          param="architects"
          {...architects}
        />
      </PopoverContent>
    </Popover>
  )
}
