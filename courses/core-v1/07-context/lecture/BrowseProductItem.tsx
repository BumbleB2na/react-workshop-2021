import * as React from 'react'
import Quantity from './Quantity'
// import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

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
  addToCart: (productId: number, name: string, price: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  getQuantity: (productId: number) => number
}

function BrowseProductItem({
  productId,
  name,
  price,
  imagePath,
  addToCart,
  updateQuantity,
  getQuantity,
}: BrowseProductItemProps) {
  const quantity = getQuantity(productId)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (quantity > 0 ? ' cta-button' : '')}
          onClick={() => {
            if (quantity === 0) {
              addToCart(productId, name, price)
            }
          }}
        >
          {quantity === 0 ? (
            'Add To Cart'
          ) : (
            <>
              <Link to="/checkout"><MdShoppingCart /> Checkout</Link>
            </>
          )}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={(value: number) => {
                updateQuantity(productId, value)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
