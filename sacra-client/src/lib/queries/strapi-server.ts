import "server-only"

import { notFound } from "next/navigation";
import { ItemsList, ObjectBySlug, Objects } from "../schemas/strapi-schemas";

export const getObjects = async (
    page: number,
    per: number,
    sort = "order:asc",
    search = "",
    architects?: string
  ): Promise<Objects> => {
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
              ${architects 
                ? `{
                  architects: {
                    title: {
                      containsi: "${architects}"
                    }
                  }
                }`
                : ''
              }

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
      next: { 
        tags: ["strapi"],
        revalidate: 60
      },
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
    const objects = Objects.parse(json.data?.objects);
  
    return objects;
};

export const getArchitecturalStyles = async (): Promise<ItemsList> => {
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
      next: { 
        tags: ["strapi"],
        revalidate: 60
      },
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
    const architecturalStyles = ItemsList.parse(json.data?.architecturalStyles);
  
    return architecturalStyles;
};

export const getArchitects = async (): Promise<ItemsList> => {
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
    next: { 
      tags: ["strapi"],
      revalidate: 60
    },
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
  const architects = ItemsList.parse(json.data?.architects);

  return architects;
};

export const getObjectBySlug = async (slug: string,): Promise<ObjectBySlug> => {
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
            slug
            title
            imagesSlider {
              data {
                attributes {
                  url
                }
              }
            }
            confession {
              data {
                attributes {
                  title
                }
              }
            }
            architectural_styles {
              data {
                attributes {
                  title
                }
              }
            }
            architects {
              data {
                attributes {
                  title
                }
              }
            }
            architectsString
            region {
              data {
                attributes {
                  title
                }
              }
            }
            district {
              data {
                attributes {
                  title
                }
              }
            }
            city {
              data {
                attributes {
                  title
                }
              }
            }
            location
            geolocation {
              latitude
              longitude
            }
            dateConstruction
            appearanceChangesList {
              title
            }
            historicalNote
            urlTour
            videos {
              data {
                attributes {
                  url
                }
              }
            }
            sources {
              title
              url
            }
            models {
              data {
                attributes {
                  title
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
    next: { 
      tags: ["strapi"],
      revalidate: 60
    },
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.objects.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const object = ObjectBySlug.parse(json.data?.objects.data[0].attributes);

  return object;
};