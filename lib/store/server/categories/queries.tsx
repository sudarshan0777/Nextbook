import api from "@/lib/api/axios"
import { useQuery } from "@tanstack/react-query"
import { Categories } from "./types"

/* ========== Get All/Featured Categories ========== */
export const getCategories = async (
  featured?: boolean
): Promise<Categories> => {
  const params = featured
    ? ""
    : "?filters[featured][$eq]=true&sort=featured_order"
  // const response = await api.get(`/categories${params}`)
  const response = await api.get(`/categories`)
  
  return response?.data
}

export const useCategories = ({
  categories,
  featured = false,
}: {
  categories: Categories
  featured?: boolean
}) =>
  useQuery({
    queryKey: featured ? ["categories", { featured: true }] : ["categories"],
    queryFn: () => getCategories(featured),
    initialData: categories,
    select: data =>
      data.data.map(({ attributes }) => ({
        name: attributes.name,
        slug: attributes.slug,
      })),
  })

/* ========== Get Category by Slug ========== */
export const getCategoryBySlug = async (slug: string): Promise<Categories> => {
  const response = await api.get(
    `/categories?filters[slug][$eq]]=${slug}&populate=*`
  )
  return response.data
}
