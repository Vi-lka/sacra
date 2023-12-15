import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import type { Item, ItemsList } from "../schemas/strapi-schemas";

export function useArchitectsList() {
  const [items, setItems] = React.useState<Array<Item>>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const defaultLimit = 10; // Number of items per page
  const [limit, setLimit] = React.useState(defaultLimit);

  const { data, isFetching, isPending, isLoading, isError, error, refetch } = useQuery<
    { architects: ItemsList },
    Error
  >({
    queryKey: ["architects"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
        /* GraphGL */ `
          query Architects {
            architects(
              pagination: {
                pageSize: ${limit}
              }
              filters: {
                objects: {
                  id: {
                    notNull: true
                  }
                }
              }
            ) {
              meta {
                pagination {
                  total
                }
              }
              data {
                id
                attributes {
                  title
                }
              }
            }
          }
        `
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  React.useEffect(() => {
    void refetch();
    if (!!data) {
      setItems(data.architects.data)
      setHasMore(limit < data.architects.meta.pagination.total)
    }
  }, [data, limit, refetch]);

  const onLoadMore = () => {
    setLimit(prev => prev + defaultLimit)
  };

  const loading = isFetching || isPending || isLoading

  return {
    items,
    hasMore,
    loading,
    isError, 
    error,
    onLoadMore,
  };
};
