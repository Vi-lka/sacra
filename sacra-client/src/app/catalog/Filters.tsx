"use client"

import SelectFilter from '@/components/custom/ui/SelectFilter'
import { useList } from '@/lib/queries/strapi-client'
import { EntityEnum } from '@/lib/schemas/strapi-schemas'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Filter } from 'lucide-react'
import React from 'react'

export default function Filters() {
  const confessions = useList(EntityEnum.confessions);
  const architecturalStyles = useList(EntityEnum.architecturalStyles);
  const architects = useList(EntityEnum.architects);
  const regions = useList(EntityEnum.regions);
  const districts = useList(EntityEnum.districts);
  const cities = useList(EntityEnum.cities);

  return (
    <Popover
      // shouldBlockScroll
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
          label="Конфессия"
          description="Выберите Конфессию"
          param="confession"
          className='mb-2'
          {...confessions}
        />
        <SelectFilter
          label="Архитектурный стиль"
          description="Выберите Архитектурный стиль"
          param="architecturalStyle"
          className='mb-2'
          {...architecturalStyles}
        />
        <SelectFilter
          label="Архитектор"
          description="Выберите Архитектора"
          param="architect"
          className='mb-2'
          {...architects}
        />
        <SelectFilter
          label="Регион"
          description="Выберите Регион"
          param="region"
          className='mb-2'
          {...regions}
        />
        <SelectFilter
          label="Район"
          description="Выберите Район"
          param="district"
          className='mb-2'
          {...districts}
        />
        <SelectFilter
          label="Город"
          description="Выберите Город"
          param="city"
          className='mb-2'
          {...cities}
        />
      </PopoverContent>
    </Popover>
  )
}
