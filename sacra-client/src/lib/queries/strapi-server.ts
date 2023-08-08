import { notFound } from "next/navigation";
import { ObjectsSchema  } from "../schemas/strapi-schemas";
import type {ObjectsType} from "../schemas/strapi-schemas";

export const getObjects = async (
    page: number,
    per: number,
    sort = "order:asc",
    search = "",
    region: string | null = null,
    confession: string | null = null,
    architecturalStyle: string | null = null,
    architect: string | null = null,
    tour = false,
    model3d = false,
  ): Promise<ObjectsType> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
      query Objects {
        objects(
          locale: "ru", 
          sort: "${sort}", 
          pagination: {
            page: ${page},
            pageSize: ${per}
          },
          filters: {
            and: [
                { title: {containsi: "${search}"} },
                { region: {or: ${region}} },
                { confession: {or: ${confession}} },
                { architecturalStyle: {or: ${architecturalStyle}} },
                { architect: {or: ${architect}} },
                ${tour ? `{ urlTour: {notNull: ${tour}} },` : ''}
                ${model3d ? `{ model3d: {title: {notNull: ${model3d}}} }` : ''}
            ]
          }
        ) {
          meta {
            pagination {
              total
            }
          }
          data {
            attributes {
              title
              slug
              region {
                region
              }
              location
              imagesSlider(
                pagination: {
                    limit: 1
                  }
              ) {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      next: { tags: ["strapi"] },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Objects'");
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();
  
    // await new Promise((resolve) => setTimeout(resolve, 3000));
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((json.data.objects.meta.pagination.total === 0) || (json.data.objects.data.length === 0)) {
      notFound()
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const Objects = ObjectsSchema.parse(json.data?.objects);
  
    return Objects;
  };