import { z } from "zod";

//.........................IMAGE.........................//
export const ImageSchema = z.object({
  attributes: z.object({
    url: z.string(),
  }),
})
.nullable()
.optional()
export type ImageType = z.infer<typeof ImageSchema>;

export const ConfessionEnum = z.enum(["Pravoslavie", "Buddizm", "Islam", "Katoliczizm", "Lyuteranstvo", "Protestantizm", "Iudaizm", "Shamanizm"]);
export type ConfessionEnum = z.infer<typeof ConfessionEnum>;

//.........................OBJECTS.........................//
export const ObjectSchema = z.object({
    attributes: z.object({
      title: z.string(),
      slug: z.string(),
      region: z.object({
        region: z.string(),
      }),
      location: z.string(),
      geolocation: z.object({
        latitude: z.number(),
        longitude: z.number()
      }),
      imagesSlider: z.object({
        data: ImageSchema.array()
      }),
    }),
});
export type ObjectType = z.infer<typeof ObjectSchema>;

export const ObjectsSchema = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: ObjectSchema.array()
});
export type ObjectsType = z.infer<typeof ObjectsSchema>;

//.........................ARCHITECTURAl STYLES.........................//
export const ArchitecturalStyleSingleSchema = z.object({
  attributes: z.object({
    title: z.string()
  })
});
export type ArchitecturalStyleSingleType = z.infer<typeof ArchitecturalStyleSingleSchema>;

export const ArchitecturalStylesSchema = z.object({
  data: ArchitecturalStyleSingleSchema.array()
});
export type ArchitecturalStylesType = z.infer<typeof ArchitecturalStylesSchema>;

//.........................ARCHITECTS.........................//
export const ArchitectSingleSchema = z.object({
  attributes: z.object({
    title: z.string()
  })
});
export type ArchitectSingleType = z.infer<typeof ArchitectSingleSchema>;

export const ArchitectsSchema = z.object({
  data: ArchitectSingleSchema.array()
});
export type ArchitectsType = z.infer<typeof ArchitectsSchema>;

//.........................DATE LIST.........................//
export const DateListSchema = z.object({
  prefix: z.string().nullable(),
  firstDate: z.string(),
  secondPrefix: z.string().nullable(),
  secondDate: z.string().nullable(),
  postfix: z.string(),
  era: z.string()
})
export type DateListType = z.infer<typeof DateListSchema>;

//.........................OBJECT BY SLUG.........................//
export const DateOfConstructionSchema = z.object({
  dateConstruction: z.string()
})
export type DateOfConstructionType = z.infer<typeof DateOfConstructionSchema>;


export const ObjectBySlugSchema = z.object({
  title: z.string(),
  slug: z.string(),
  confession: z.object({
    confession: ConfessionEnum
  }),
  region: z.object({
    region: z.string(),
  }),
  location: z.string(),
  imagesSlider: z.object({
    data: ImageSchema.array()
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
  dateOfConstruction: 
    DateOfConstructionSchema.array()
  .or(
    DateListSchema.array()
  ),
  sources: z.object({
    title: z.string(),
    url: z.string()
  }).array().nullable()
});
export type ObjectBySlugType = z.infer<typeof ObjectBySlugSchema>;
