import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProductFilters from 'YesterTech/ProductFilters'

function ProductsSidebar() {
	const query = '(min-width: 800px)';
	const [isWide, setIsWide] = useState(window.matchMedia(query).matches);

	useEffect(() => {
		const media = window.matchMedia(query);
		const listener = () => setIsWide(media.matches);
		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [isWide]);

	if(!isWide) return <></>;

  return (
    <aside>
      <ProductFilters />
    </aside>
  )
}

export default ProductsSidebar
