
import { useQuery } from "@tanstack/react-query";

import { ProductSchema } from "@/interfaces/product";
import { fetcher } from "@/lib/api";


export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const data = await fetcher(`/products/${id}`)
      return ProductSchema.parse(data)
    },
  })
}
