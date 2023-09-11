"use client"

import * as React from "react"
import { MultiSelect } from "./MultiSelect"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { confessionOptions, regionOptions } from "@/lib/statics"

type Props = {
  archStyleOptions?: {value: string, label: string}[],
  architectsOptions?: {value: string, label: string}[]
}

export function Filters(props: Props) {

    const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
        <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold md:text-2xl text-xl mb-1">
                Фильтры
            </h1>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <p className="lg:text-sm text-xs">
                    {isOpen ? 'Свернуть' : 'Раскрыть'}
                </p>
                <CaretSortIcon className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
                <MultiSelect options={regionOptions} placeholder={'Местонахождение'} param={'region'} />
                <MultiSelect options={confessionOptions} placeholder={'Кофессия'} param={'confession'} />
                {props.archStyleOptions ? (
                  <MultiSelect options={props.archStyleOptions} placeholder={'Архитектурный стиль'} param={'archStyle'} />
                ) : null}
                {props.architectsOptions ? (
                  <MultiSelect options={props.architectsOptions} placeholder={'Архитектор'} param={'architect'} />
                ) : null}
            </div>
            {/* <h1 className="font-bold md:text-lg text-base my-4">
                Дополнительные фильтры
            </h1>
            <div className="flex md:flex-row flex-col md:items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tour" />
                  <Label htmlFor="tour">Виртуальный тур</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="artifacts" />
                  <Label htmlFor="artifacts">Артефакты</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="3d" />
                  <Label htmlFor="3d">3D модель</Label>
                </div>
            </div> */}
        </CollapsibleContent>
    </Collapsible>
  )
}
