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

//.........................DYNAMIC ZONE.........................//
export const RichTextComp = z.object({
  __typename: z.literal("ComponentContentRichText"),
  text: z.string(),
})
export type RichTextComp = z.infer<typeof RichTextComp>;

export const SliderComp = z.object({
  __typename: z.literal("ComponentContentSlider"),
  images: z.object({
    data: Image.array()
  }),
})
export type SliderComp = z.infer<typeof SliderComp>;

export const VideoEmbedComp = z.object({
  __typename: z.literal("ComponentContentVideo"),
  embeded: z.string(),
})
export type VideoEmbedComp = z.infer<typeof VideoEmbedComp>;

export const VideoFileComp = z.object({
  __typename: z.literal("ComponentContentVideoFile"),
  file: Image,
})
export type VideoFileComp = z.infer<typeof VideoFileComp>;

export const FileComp = z.object({
  __typename: z.literal("ComponentContentFile"),
  name: z.string(),
  file: Image,
})
export type FileComp = z.infer<typeof FileComp>;


export const UrlComp = z.object({
  __typename: z.literal("ComponentContentUrl"),
  name: z.string(),
  url: z.string(),
})
export type UrlComp = z.infer<typeof UrlComp>;

export const DynamicZone = z.union([RichTextComp, SliderComp, VideoEmbedComp, VideoFileComp, FileComp, UrlComp])
export type DynamicZone = z.infer<typeof DynamicZone>;

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
    }).nullable()
  }).nullable(),
  model: z.string().nullable()
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

export const Tours = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
});
export type Tours = z.infer<typeof Tours>;

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
          width: z.number(),
          height: z.number()
        }),
      })
    }),
    description: z.string().nullable(),
    defaultYaw: z.number().nullable(),
    defaultPitch: z.number().nullable(),
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

//.........................PUBLICATIONS.........................//
export const Publication = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    image: z.object({
      data: Image
    }),
    date: z.string(),
    short_description: z.string(),
    content: DynamicZone.array()
  }),
});
export type Publication = z.infer<typeof Publication>;

export const Publications = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: z.object({
    id: z.string(),
    attributes: z.object({
      title: z.string(),
      image: z.object({
        data: Image
      }),
      date: z.string(),
      short_description: z.string()
    }),
  }).array()
});
export type Publications = z.infer<typeof Publications>;


//.........................FOOTER.........................//
export const FooterT = z.object({
  number: z.string().nullable(),
  email: z.string().nullable(),
})
export type FooterT = z.infer<typeof FooterT>

