import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { fetcher } from "@/lib/api";

const CategorySchema = z.object({
    slug: z.string(),
    name: z.string(),
    url: z.string(),
});

const ProductThumbnailSchema = z.object({
    products: z.array(z.object({
        thumbnail: z.string()
    }))
});

export interface CategoryWithImage {
    slug: string;
    name: string;
    image: string;
}

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const categoriesData = await fetcher<unknown>('/products/categories');
            const categories = z.array(CategorySchema).parse(categoriesData);

            const topCategories = categories.slice(0, 12);

            const categoriesWithImages = await Promise.all(
                topCategories.map(async (cat) => {
                    try {
                        const productData = await fetcher<unknown>(`/products/category/${cat.slug}?limit=1&select=thumbnail`);
                        const parsed = ProductThumbnailSchema.parse(productData);
                        const image = parsed.products[0]?.thumbnail || '/placeholder.png';
                        return {
                            slug: cat.slug,
                            name: cat.name,
                            image
                        };
                    } catch (e) {
                        console.error(`Failed to fetch image for category ${cat.slug}`, e);
                        return {
                            slug: cat.slug,
                            name: cat.name,
                            image: '/placeholder.png'
                        };
                    }
                })
            );

            return categoriesWithImages;
        },
        staleTime: 1000 * 60 * 60,
    });
}
