import { Separator } from "@/components/ui/separator";
import ErrorHandler from "@/components/custom/ui/ErrorHandler";
import { Filters } from "@/components/custom/ui/Filters";
import ImgText from "@/components/custom/ui/ImgText";
import PaginationControls from "@/components/custom/ui/PaginationControls";
import SearchField from "@/components/custom/ui/SearchField";
import Sort from "@/components/custom/ui/Sort";
import { getArchitects, getArchitecturalStyles, getObjects } from "@/lib/queries/strapi-server";
import { getRegion } from "@/lib/utils";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Каталог",
};

export default async function Catalog({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined },
  }) {

    const defaultPageSize = 12

    const page = searchParams['page'] ?? '1'
    const per = searchParams['per'] ?? defaultPageSize
    const sort = searchParams['sort'] as string | undefined
    const search = searchParams['search'] as string | undefined
    const region = searchParams['region'] as string | undefined
    const confession = searchParams['confession'] as string | undefined
    const archStyle = searchParams['archStyle'] as string | undefined
    const architect = searchParams['architect'] as string | undefined

    const sortData = [
      { val: 'title:asc', text: 'Название: А-Я' },
      { val: 'title:desc', text: 'Название: Я-А' },
    ] as {val:string, text: string}[]

    try {
      await getArchitecturalStyles()
      await getArchitects()
    } catch (error) {
      return (
        <ErrorHandler 
          error={error} 
          place="Objects" 
          notFound 
          goBack={false}
        >
          <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mb-20">
              <div className="mt-10">
                  <h1 className="font-bold md:text-2xl text-xl mb-4">
                      Поиск по коллекции
                  </h1>
                  <SearchField placeholder="Найти..." />
              </div>

              <Separator className="my-8 bg-foreground" />
              <Filters />
              <Separator className="my-8 bg-foreground" />
          </div>
        </ErrorHandler>
      )
    }

    const archStylesResult = await getArchitecturalStyles()
    const architectsResult = await getArchitects()

    const archStyleOptions = archStylesResult.data.map(style => {
      return {value: style.attributes.title, label: style.attributes.title}
    })

    const architectsOptions = architectsResult.data.map(style => {
      return {value: style.attributes.title, label: style.attributes.title}
    })

    try {
        await getObjects(
          Number(page), 
          Number(per), 
          sort, 
          search, 
          region, 
          confession, 
          archStyle,
          architect
        );
    } catch (error) {
        return (
          <ErrorHandler 
            error={error} 
            place="Objects" 
            notFound 
            goBack={false}
          >
            <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mb-20">
                <div className="mt-10">
                    <h1 className="font-bold md:text-2xl text-xl mb-4">
                        Поиск по коллекции
                    </h1>
                    <SearchField placeholder="Найти..." />
                </div>

                <Separator className="my-8 bg-foreground" />
                <Filters archStyleOptions={archStyleOptions} architectsOptions={architectsOptions} />
                <Separator className="my-8 bg-foreground" />
            </div>
          </ErrorHandler>
        )
    }

    const dataResult = await getObjects(
                              Number(page), 
                              Number(per), 
                              sort, 
                              search, 
                              region, 
                              confession, 
                              archStyle,
                              architect
                            );

  return (
    <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] mb-20">
        <div className="">
            <div className="mt-10">
                <h1 className="font-bold md:text-2xl text-xl mb-4">
                    Поиск по коллекции
                </h1>
                <SearchField placeholder="Найти..." />
            </div>

            <Separator className="my-8 bg-foreground" />
            <Filters archStyleOptions={archStyleOptions} architectsOptions={architectsOptions} />
            <Separator className="my-8 bg-foreground" />
        </div>

        <div className="">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-bold md:text-lg text-base">
                    Найдено {dataResult.meta.pagination.total} объектов
                </h1>

                <Sort 
                  data={sortData}
                />
            </div>

            <div className="md:w-full w-[85%] mx-auto mb-12 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {dataResult.data.map((obj, index) => (
                  <ImgText
                    key={index}
                    className={"md:aspect-[5/4] aspect-square"}
                    title={obj.attributes.title}
                    src={obj.attributes.imagesSlider.data[0]?.attributes.url}
                    url={`/catalog/${obj.attributes.slug}`}
                    width={450}
                    height={400}
                  >
                     <p className="w-full xl:text-sm text-xs text-center">
                        <span className="font-bold xl:text-base text-sm">{obj.attributes.title}</span>
                        <br/>
                        {getRegion(obj.attributes.region.region)}, {obj.attributes.location}
                      </p>
                  </ImgText>
                ))}
            </div>

            <div className="">
              <PaginationControls
                length={dataResult.meta.pagination.total}
                defaultPageSize={defaultPageSize}
              />
            </div>
        </div>
    </div>
  )
}
