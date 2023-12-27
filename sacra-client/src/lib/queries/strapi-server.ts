import "server-only"

import { notFound } from "next/navigation";
import { Cities, ObjectBySlug, Objects, Tour } from "../schemas/strapi-schemas";

export const getObjects = async (
    page: number,
    per: number,
    sort = "order:asc",
    search = "",
    confession?: string,
    architects?: string,
    architecturalStyle?: string,
    region?: string,
    district?: string,
    city?: string,
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
              {title: { containsi: "${search}" }},
              ${confession 
                ? `{
                  confession: {
                    title: { containsi: "${confession}" }
                  }
                }`
                : ''
              }
              ${architects 
                ? `{
                  architects: {
                    title: { containsi: "${architects}" }
                  }
                }`
                : ''
              }
              ${architecturalStyle 
                ? `{
                  architectural_styles: {
                    title: { containsi: "${architecturalStyle}" }
                  }
                }`
                : ''
              }
              ${region 
                ? `{
                  region: {
                    title: { containsi: "${region}" }
                  }
                }`
                : ''
              }
              ${district 
                ? `{
                  district: {
                    title: { containsi: "${district}" }
                  }
                }`
                : ''
              }
              ${city 
                ? `{
                  city: {
                    title: { containsi: "${city}" }
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
              region {
                data {
                  id
                  attributes {
                    title
                  }
                }
              }
              district {
                data {
                  id
                  attributes {
                    title
                  }
                }
              }
              city {
                data {
                  id
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((json.data.objects.meta.pagination.total === 0) || (json.data.objects.data.length === 0)) {
      notFound()
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const objects = Objects.parse(json.data?.objects);
  
    return objects;
};

export const getObjectBySlug = async (slug: string): Promise<ObjectBySlug> => {
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
              data {attributes {url}}
            }
            confession {
              data {
                id
                attributes {
                  title
                }
              }
            }
            architectural_styles {
              data {
                id
                attributes {
                  title
                }
              }
            }
            architects {
              data {
                id
                attributes {
                  title
                }
              }
            }
            architectsString
            region {
              data {
                id
                attributes {
                  title
                }
              }
            }
            district {
              data {
                id
                attributes {
                  title
                }
              }
            }
            city {
              data {
                id
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
            appearanceChangesList { title }
            historicalNote
            urlTour
            videos {
              data {attributes {url}}
            }
            sources {
              title
              url
            }
            tour {data {id}}
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

export const getCities = async (): Promise<Cities> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Cities {
      cities {
        meta {
          pagination {
            total
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
    throw new Error("Failed to fetch data 'Cities'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.cities.meta.pagination.total === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const cities = Cities.parse(json.data.cities);

  return cities;
};

export const getTour = async (id: string): Promise<Tour> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Tour {
      tour(id: "${id}") {
        data {
          attributes {
            title
            startNode {data { id }}
            nodes {
              data {
                id
                attributes {
                  title
                  thumbnail {
                    data {attributes { url }}
                  }
                  panorama {
                    data {attributes {url}}
                  }
                  description
                  links {
                    data {
                      id
                      attributes {
                        toNode {data {id}}
                        position {
                          textureX
                          textureY
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
    throw new Error("Failed to fetch data 'Tour'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.tour.data === null)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const tour = Tour.parse(json.data.tour.data.attributes);

  return tour;
};
