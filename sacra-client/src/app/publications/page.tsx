import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import ImageComponent from '@/components/custom/ui/ImageComponent';
import PaginationControls from '@/components/custom/ui/PaginationControls';
import SearchField from '@/components/custom/ui/SearchField';
import Sort from '@/components/custom/ui/Sort';
import { getPublications } from '@/lib/queries/strapi-server';
import { Card, CardBody } from '@nextui-org/react';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const revalidate = 60

export const metadata: Metadata = {
    title: "Публикации",
};

export default async function Publications({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const defaultPageSize = 1

    const page = searchParams['page'] ?? '1'
    const per = searchParams['per'] ?? defaultPageSize
    const sort = searchParams['sort'] as string | undefined
    const search = searchParams['search'] as string | undefined

    const sortData = [
        { val: 'title:asc', text: 'Название: А-Я' },
        { val: 'title:desc', text: 'Название: Я-А' },
    ] as {val:string, text: string}[]

    const [ dataResult ] = await Promise.allSettled([
        getPublications(
          Number(page), 
          Number(per), 
          sort, 
          search
        )
      ]);
      if (dataResult.status === "rejected")
      return (
        <ErrorHandler
          error={dataResult.reason as unknown}
          place="Publications" 
          notFound
          goBack
        >
            <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
                <div className="mt-10">
                    <h1 className="font-bold md:text-2xl text-xl mb-4">
                        Поиск по публикациям
                    </h1>
                    <div className="flex flex-col gap-6">
                        <SearchField placeholder="Найти..." className="flex-1" />
                    </div>
                </div>
            </div>
        </ErrorHandler>
    );

    return (
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
            <div className="mb-6">
                <div className="mt-10">
                    <h1 className="font-bold md:text-2xl text-xl mb-4">
                        Поиск по публикациям
                    </h1>
                    <div className="flex flex-col gap-6">
                        <SearchField placeholder="Найти..." className="flex-1" />
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-bold md:text-lg text-sm">
                        <span className="md:inline hidden">Найдено</span> {dataResult.value.meta.pagination.total} публикаций
                    </h1>

                    <Sort data={sortData}/>
                </div>

                <div key={Math.random()} className="md:w-full w-[85%] mx-auto mb-12 flex flex-col gap-6">
                    {dataResult.value.data.map(publication => {
                        const dateArray = publication.attributes.date.split("-")

                        // Change year position
                        const newDateString = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
                        
                        return (
                            <Card 
                                key={publication.id}
                                className="border border-foreground bg-background/20 p-4 hover:scale-[1.03]"
                                shadow="sm"
                            >
                                <CardBody>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center justify-center">
                                        <Link href={`/publications/${publication.id}`} className="relative md:col-span-4 h-full min-h-[250px]">
                                            <ImageComponent
                                                alt="Фото публикации"
                                                src={publication.attributes.image.data?.attributes.url}
                                                fill
                                                sizes='(max-width: 1024px) 80vw, 25vw'
                                                className="object-cover shadow-md rounded-xl"
                                            />
                                        </Link>

                                        <div className="flex flex-col justify-between md:col-span-8 gap-6 h-full">
                                            <div>
                                                <Link 
                                                    href={`/publications/${publication.id}`} 
                                                    className='hover:text-accent transition-all duration-300'
                                                >
                                                    <h1 className="font-bold text-base mb-3">{publication.attributes.title}</h1>
                                                </Link>
                                                <p className="md:text-sm text-xs">{publication.attributes.short_description}</p>
                                            </div>

                                            <div className='flex w-full items-center justify-between'>
                                                <h3 className='font-semibold text-sm'>{newDateString}</h3>
                                                <Link 
                                                    href={`/publications/${publication.id}`} 
                                                    className='underline underline-offset-4 hover:text-accent transition-all duration-300'
                                                >Читать далее</Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>

                <div className="">
                  <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={defaultPageSize}
                  />
                </div>
            </div>
        </div>
    )
}
