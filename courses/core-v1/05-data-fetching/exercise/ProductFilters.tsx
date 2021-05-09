import * as React from 'react'
import { useEffect, useState } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

function useCategories() {	
  const [categories, setCategories] = useState<string[] | null>(null)

	useEffect(function fetchCategories() {
		let isCurrent = true
		getCategories().then(cats => {
			if (!isCurrent) return
			setCategories(cats)
		})
		return () => { isCurrent = false }
	}, [])

	return categories
}

const ProductFilters: React.FC = () => {
	const categories: string[] | null = useCategories()

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

export default ProductFilters
