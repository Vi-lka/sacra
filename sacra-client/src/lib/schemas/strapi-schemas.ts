import { z } from "zod";

//.........................IMAGE.........................//
export const Image = z.object({
  attributes: z.object({
    url: z.string(),
  }),
})
.nullable()
.optional()
export type Image = z.infer<typeof Image>;

//.........................ARCHITECTURAl STYLES.........................//
export const ArchitecturalStyleSingle = z.object({
  attributes: z.object({
    title: z.string()
  })
});
export type ArchitecturalStyleSingle = z.infer<typeof ArchitecturalStyleSingle>;

export const ArchitecturalStyles = z.object({
  data: ArchitecturalStyleSingle.array()
});
export type ArchitecturalStyles = z.infer<typeof ArchitecturalStyles>;

//.........................ARCHITECTS.........................//
export const ArchitectSingle = z.object({
  attributes: z.object({
    title: z.string()
  })
});
export type ArchitectSingle = z.infer<typeof ArchitectSingle>;

export const Architects = z.object({
  data: ArchitectSingle.array()
});
export type Architects = z.infer<typeof Architects>;

//.........................OBJECTS.........................//
export const Object = z.object({
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string(),
    geolocation: z.object({
      latitude: z.number(),
      longitude: z.number()
    }),
    imagesSlider: z.object({
      data: Image.array()
    }),
  }),
});
export type Object = z.infer<typeof Object>;

export const Objects = z.object({
meta: z.object({
  pagination: z.object({
    total: z.number(),
  })
}),
data: Object.array()
});
export type Objects = z.infer<typeof Objects>;

//.........................OBJECT BY SLUG.........................//

export const ObjectBySlug = z.object({
  title: z.string(),
  slug: z.string(),
  region: z.object({
    region: z.string(),
  }),
  location: z.string(),
  imagesSlider: z.object({
    data: Image.array()
  }),
  geolocation: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  urlTour: z.string().nullable(),
  model3d: z.object({
    data: z.object({
      attributes: z.object({
        file: z.object({
          data: z.object({
            attributes: z.object({
              url: z.string()
            })
          })
        })
      })
    }).nullable()
  }),
  historicalNote: z.string().nullable(),
  architect: z.object({
    data: z.object({
      attributes: z.object({
        title: z.string()
      })
    }).nullable()
  }),
  architecturalStyles: z.object({
    data: z.object({
      attributes: z.object({
        title: z.string()
      })
    }).array()
  }),
  sources: z.object({
    title: z.string(),
    url: z.string()
  }).array().nullable()
});
export type ObjectBySlug = z.infer<typeof ObjectBySlug>;
