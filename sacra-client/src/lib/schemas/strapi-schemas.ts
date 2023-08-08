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

//.........................OBJECT.........................//
export const ObjectSchema = z.object({
    attributes: z.object({
      title: z.string(),
      slug: z.string(),
      region: z.object({
        region: z.string(),
      }),
      location: z.string(),
      imagesSlider: z.object({
        data: ImageSchema.array()
      }),
    }),
});
export type ObjectType = z.infer<typeof ObjectSchema>;

//.........................OBJECTS.........................//
export const ObjectsSchema = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: ObjectSchema.array()
});
export type ObjectsType = z.infer<typeof ObjectsSchema>;
