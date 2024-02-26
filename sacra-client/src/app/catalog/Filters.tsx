"use client"

import SelectFilter from '@/components/custom/ui/SelectFilter'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useList } from '@/lib/queries/strapi-client'
import { EntityEnum } from '@/lib/schemas/strapi-schemas'
import React from 'react'

export default function Filters() {
  const confessions = useList(EntityEnum.confessions);
  const architecturalStyles = useList(EntityEnum.architecturalStyles);
  const architects = useList(EntityEnum.architects);
  const regions = useList(EntityEnum.regions);
  const districts = useList(EntityEnum.districts);
  const cities = useList(EntityEnum.cities);

  return (
    <Accordion type="single" collapsible className='border-b-2'>
      <AccordionItem value="item-1">
        <AccordionTrigger className='w-full font-bold md:text-xl text-lg'>
          Фильры
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-wrap gap-3 justify-evenly'>
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
              label="Населённый пункт"
              description="Выберите Населённый пункт"
              param="city"
              className='mb-2'
              {...cities}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
