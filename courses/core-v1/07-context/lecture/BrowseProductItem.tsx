import * as React from 'react'
import Quantity from './Quantity'
// import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'
import { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'

interface BrowseProductItemProps {
  productId: number
  name: string
  price: number
  imagePath: string
  year?: string
  condition?: string
  brand?: string
  category?: string
  rating?: number
}

function BrowseProductItem({ productId, name, price, imagePath }: BrowseProductItemProps) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (quantity > 0 ? ' cta-button' : '')}
          onClick={() => (quantity === 0 ? setQuantity(1) : null)}
        >
          {quantity === 0 ? (
            'Add To Cart'
          ) : (
            <>
              <MdShoppingCart /> Checkout
            </>
          )}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity quantity={quantity} onChange={(value: number) => setQuantity(value)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
