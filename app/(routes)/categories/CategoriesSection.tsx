"use client"

import Link from "next/link"
import BookRow from "@/components/BookRow"
import CaretDownIcon from "@/icons/CaretDownIcon"
import { useCategories } from "@/store/server/categories/queries"
import { Category } from "@/store/server/categories/types"
import { GetResponse } from "@/types/api"

interface CategoriesSectionProps {
  categories: GetResponse<Category[]>
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  const { data } = useCategories({ categories })

  return (
    <>
      {data.length > 0 &&
        data.map(({ name, slug }) => (
          <section key={slug} className="pb-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
                {name}
              </h2>
              <SeeAll href={`/categories/${slug}`} />
            </div>
            <BookRow key={slug} slug={slug} />
            <div className="mt-8 flex items-center justify-center md:hidden">
              <SeeAll href={`/categories/${slug}`} bottom />
            </div>
          </section>
        ))}
    </>
  )
}

type SeeAllType = {
  href: string
  bottom?: boolean
}

const SeeAll = ({ href, bottom = false }: SeeAllType) => (
  <Link
    href={href}
    className={`${
      bottom ? "flex" : "hidden md:flex"
    } items-center font-sans font-medium`}
  >
    See All
    <CaretDownIcon className="-rotate-90 scale-75" />
  </Link>
)
