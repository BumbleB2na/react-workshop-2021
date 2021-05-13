import * as React from 'react'
import { useProducts } from './utils'
// import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'
import { NavLink } from 'react-router-dom'

interface BrowseProductsProps {
  addToCart: (productId: number, name: string, price: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  getQuantity: (productId: number) => number
	cart: any[]
}

function BrowseProducts({
  addToCart,
  updateQuantity,
  getQuantity,
	cart
 }: BrowseProductsProps) {
  const products = useProducts()

  return (
    <div className="spacing">
      {cart.length > 0 ? (
				<nav>
					<NavLink to="/checkout">View Cart ({cart.length})</NavLink>
				</nav>
			) : (
				<span>Cart Empty</span>
			)}
      <hr />
      {products.map((product) => {
        return (
          <BrowseProductItem
            key={product.id}
            productId={product.id}
            name={product.name}
            price={product.price}
            imagePath={product.imagePath}
						addToCart={addToCart}
						updateQuantity={updateQuantity}
						getQuantity={getQuantity}
          />
        )
      })}
    </div>
  )
}

export default BrowseProducts
