import "server-only"

import { notFound } from "next/navigation";
import { ArchitectsSchema, ArchitecturalStylesSchema, ObjectBySlugSchema, ObjectsSchema  } from "../schemas/strapi-schemas";
import type {ArchitectsType, ArchitecturalStylesType, ObjectBySlugType, ObjectsType} from "../schemas/strapi-schemas";

export const getObjects = async (
    page: number,
    per: number,
    sort = "order:asc",
    search = "",
    region: string | null = null,
    confession: string | null = null,
    archStyle: string | null = null,
    architect: string | null = null,
    tour = false,
    model3d = false,
  ): Promise<ObjectsType> => {
    const headers = { "Content-Type": "application/json" };

    function getFilter(entity: string, string: string | null) {
      let filter = ""

      const arrayFormString = string?.split('_')

      if (arrayFormString) {
        arrayFormString.forEach(filterString => {
          filter = filter + `{${entity}: {eqi: "${filterString}"}}`
        })
      }

      return filter
    }

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
                { region: {or: [${getFilter("region", region)}]} },
                { confession: {or: [${getFilter("confession", confession)}]} },
                { architecturalStyle: {or: [${getFilter("title", archStyle)}]} },
                { architect: {or: [${getFilter("title", architect)}]} },
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
              geolocation {
                latitude
                longitude
              }
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

export const getArchitecturalStyles = async (): Promise<ArchitecturalStylesType> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
      query ArchStyles {
        architecturalStyles {
          data {
            attributes {
              title
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
      throw new Error("Failed to fetch data 'Architectural Styles'");
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();
  
    // await new Promise((resolve) => setTimeout(resolve, 3000));
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((json.data.architecturalStyles.data.length === 0)) {
      notFound()
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ArchitecturalStyles = ArchitecturalStylesSchema.parse(json.data?.architecturalStyles);
  
    return ArchitecturalStyles;
};

export const getArchitects = async (): Promise<ArchitectsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Architects {
      architects {
        data {
          attributes {
            title
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
    throw new Error("Failed to fetch data 'Architects'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.architects.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const Architects = ArchitectsSchema.parse(json.data?.architects);

  return Architects;
};

export const getObjectBySlug = async (slug: string,): Promise<ObjectBySlugType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query ObjectBySlug {
      objects(
        filters: {
          slug: {
            eq: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            title
            slug
            confession {
              confession
            }
            region {
              region
            }
            location
            imagesSlider {
              data {
                attributes {
                  url
                }
              }
            }
            geolocation {
              latitude
              longitude
            }
            urlTour
            model3d {
              data {
                attributes {
                  file {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            historicalNote
            architect {
              data {
                attributes {
                  title
                }
              }
            }
            architecturalStyle {
              data {
                attributes {
                  title
                }
              }
            }
            dateOfConstruction {
              ... on ComponentObjectsDateConstruction {
                dateConstruction
              }
              ... on ComponentObjectsDateConstructionList {
                prefix
                firstDate
                secondPrefix
                secondDate
                postfix
                era
              }
            }
            sources {
              title
              url
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
    throw new Error("Failed to fetch data 'Object By Slug'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.objects.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const ObjectBySlug = ObjectBySlugSchema.parse(json.data?.objects.data[0].attributes);

  return ObjectBySlug;
};