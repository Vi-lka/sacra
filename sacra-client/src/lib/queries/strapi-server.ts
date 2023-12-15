import "server-only"

import { notFound } from "next/navigation";
import {Architects, ArchitecturalStyles, ObjectBySlug, Objects} from "../schemas/strapi-schemas";

export const getObjects = async (
    page: number,
    per: number,
    sort = "order:asc",
    search = "",
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

export const getArchitecturalStyles = async (): Promise<ArchitecturalStyles> => {
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
    const architecturalStyles = ArchitecturalStyles.parse(json.data?.architecturalStyles);
  
    return architecturalStyles;
};

export const getArchitects = async (): Promise<Architects> => {
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
  const architects = Architects.parse(json.data?.architects);

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
            architecturalStyles {
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

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.objects.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const object = ObjectBySlug.parse(json.data?.objects.data[0].attributes);

  return object;
};