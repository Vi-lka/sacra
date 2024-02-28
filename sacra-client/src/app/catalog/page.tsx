
import ErrorHandler from "@/components/custom/ui/ErrorHandler";
import ImgText from "@/components/custom/ui/ImgText";
import PaginationControls from "@/components/custom/ui/PaginationControls";
import SearchField from "@/components/custom/ui/SearchField";
import Sort from "@/components/custom/ui/Sort";
import { getObjects } from "@/lib/queries/strapi-server";
import type { Metadata } from "next";
import Filters from "./Filters";

export const revalidate = 60

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
  const confession = searchParams['confession'] as string | undefined
  const architects = searchParams['architect'] as string | undefined
  const architecturalStyle = searchParams['architecturalStyle'] as string | undefined
  const region = searchParams['region'] as string | undefined
  const district = searchParams['district'] as string | undefined
  const city = searchParams['city'] as string | undefined

  const sortData = [
    { val: 'title:asc', text: 'Название: А-Я' },
    { val: 'title:desc', text: 'Название: Я-А' },
  ] as {val:string, text: string}[]

  const [ dataResult ] = await Promise.allSettled([
    getObjects(
      Number(page), 
      Number(per), 
      sort, 
      search,
      confession,
      architects,
      architecturalStyle,
      region,
      district,
      city,
    )
  ]);
  if (dataResult.status === "rejected")
  return (
    <ErrorHandler
      error={dataResult.reason as unknown}
      place="Objects" 
      notFound
      goBack
    >
      <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
        <div className="mt-10">
          <h1 className="font-bold md:text-2xl text-xl mb-4">
            Поиск по коллекции
          </h1>
          <div className="flex flex-col gap-6">
            <SearchField placeholder="Найти..." className="flex-1" />
            <Filters />
          </div>
        </div>
        {/* <Separator className="my-8 bg-foreground" /> */}
      </div>
    </ErrorHandler>
  );

  return (
    <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-20">
        <div className="mb-6">
            <div className="mt-10">
                <h1 className="font-bold md:text-2xl text-xl mb-4">
                    Поиск по коллекции
                </h1>
                <div className="flex flex-col gap-6">
                  <SearchField placeholder="Найти..." className="flex-1" />
                  <Filters />
                </div>
            </div>
            {/* <Separator className="my-8 bg-foreground" /> */}
        </div>

        <div className="">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-bold md:text-lg text-sm">
                    <span className="md:inline hidden">Найдено</span> {dataResult.value.meta.pagination.total} объектов
                </h1>

                <Sort 
                  data={sortData}
                />
            </div>

            <div key={Math.random()} className="md:w-full w-[85%] mx-auto mb-12 grid min-[3000px]:grid-cols-6 min-[2000px]:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {dataResult.value.data.map((object, index) => {
                  const region = !!object.attributes.region.data ? object.attributes.region.data.attributes.title : ""
                  const city = !!object.attributes.city.data ? ", " + object.attributes.city.data.attributes.title : ""
                  return (
                    <ImgText
                      key={index}
                      className={"md:aspect-[5/4] aspect-square"}
                      title={object.attributes.title}
                      src={object.attributes.imagesSlider.data[0]?.attributes.url}
                      url={`/catalog/${object.attributes.slug}`}
                      width={450}
                      height={400}
                    >
                       <div className="w-full text-center">
                          <p className="font-bold xl:text-lg text-base">{object.attributes.title}</p>
                          <p className="xl:text-sm text-xs">{region + city}</p>
                        </div>
                    </ImgText>
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
