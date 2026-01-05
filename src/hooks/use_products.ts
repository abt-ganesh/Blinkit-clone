import { useQuery } from "@tanstack/react-query";

import { ProductsResponseSchema } from "@/interfaces/product";
import { fetcher } from "@/lib/api";

export function useProducts(category?: string | null) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const endpoint = category
        ? `/products/category/${category}`
        : '/products?limit=30';
      const data = await fetcher(endpoint)
      return ProductsResponseSchema.parse(data)
    },
  })
}
