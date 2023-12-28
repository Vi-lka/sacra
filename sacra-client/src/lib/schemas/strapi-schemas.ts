import { z } from "zod";

export enum EntityEnum {
  objects = "objects",
  object = "object",
  confessions = "confessions",
  confession = "confession",
  architects = "architects",
  architect = "architect",
  architecturalStyles = "architecturalStyles",
  architecturalStyle = "architecturalStyle",
  regions = "regions",
  region = "region",
  districts = "districts",
  district = "district",
  cities = "cities",
  city = "city",
  models3D = "models3D",
  model3D = "model3D",
}

//.........................IMAGE.........................//
export const Image = z.object({
  attributes: z.object({
    url: z.string(),
  }),
})
.nullable()
.optional()
export type Image = z.infer<typeof Image>;

//.........................ITEMS LIST.........................//
export const Item = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string()
  })
});
export type Item = z.infer<typeof Item>;

export const ItemsList = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: Item.array()
});
export type ItemsList = z.infer<typeof ItemsList>;

//.........................MODELS.........................//
export const Model = z.object({
  attributes: z.object({
    title: z.string(),
    file: z.object({
      data: Image
    }),
  })
});
export type Model = z.infer<typeof Model>;

export const Models = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: Model.array()
});
export type Models = z.infer<typeof Models>;


//.........................OBJECTS.........................//
export const Object = z.object({
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    region: z.object({
      data: Item.nullable()
    }),
    district: z.object({
      data: Item.nullable()
    }),
    city: z.object({
      data: Item.nullable()
    }),
    location: z.string().nullable(),
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
  slug: z.string(),
  title: z.string(),
  imagesSlider: z.object({
    data: Image.array()
  }),
  confession: z.object({
    data: Item.nullable()
  }),
  architectural_styles: z.object({
    data: Item.array()
  }),
  architects: z.object({
    data: Item.array()
  }),
  architectsString: z.string().nullable(),
  region: z.object({
    data: Item.nullable()
  }),
  district: z.object({
    data: Item.nullable()
  }),
  city: z.object({
    data: Item.nullable()
  }),
  location: z.string().nullable(),
  geolocation: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  dateConstruction: z.string().nullable(),
  appearanceChangesList: z.object({
    title: z.string(),
  }).array(),
  historicalNote: z.string().nullable(),
  urlTour: z.string().nullable(),
  videos: z.object({
    data: Image.array()
  }),
  sources: z.object({
    title: z.string(),
    url: z.string()
  }).array(),
  tour: z.object({
    data: z.object({
      id: z.string()
    })
  }).nullable(),
  models: z.object({
    data: Model.array()
  }),
});
export type ObjectBySlug = z.infer<typeof ObjectBySlug>;


export const Cities = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
});
export type Cities = z.infer<typeof Cities>;

export const NodeLink = z.object({
  id: z.string(),
  attributes: z.object({
    toNode: z.object({
      data: z.object({
        id: z.string()
      }).nullable()
    }),
    position: z.object({
      textureX: z.number(),
      textureY: z.number(),
    })
  })
});
export type NodeLink = z.infer<typeof NodeLink>;

export const Node = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    thumbnail: z.object({
      data: Image
    }),
    panorama: z.object({
      data: z.object({
        attributes: z.object({
          url: z.string(),
        }),
      })
    }),
    description: z.string().nullable(),
    links: z.object({
      data: NodeLink.array()
    })
  })
});
export type Node = z.infer<typeof Node>;

export const Tour = z.object({
  title: z.string(),
  startNode: z.object({
    data: z.object({
      id: z.string()
    }).nullable()
  }),
  nodes: z.object({
    data: Node.array()
  })
});
export type Tour = z.infer<typeof Tour>;