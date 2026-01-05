import { useQuery } from "@tanstack/react-query";

import { ProductsResponseSchema } from "@/interfaces/product";
import { fetcher } from "@/lib/api";

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await fetcher('/products?limit=30')
      return ProductsResponseSchema.parse(data)
    },
  })
}
