import * as React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import BrowseProducts from './BrowseProducts'
import Checkout from './Checkout'
// import { useShoppingCart } from './ShoppingCartState'
import 'YesterTech/PrimaryLayout.scss'

function PrimaryLayout(): React.ReactElement {
  const [cart, setCart] = React.useState([])

  function addToCart(productId: number, name: string, price: number) {
    const newCart = cart.concat([{ productId, quantity: 1, name, price }])
    setCart(newCart)
  }

  function updateQuantity(productId: number, quantity: number) {
    let newCart
    if (quantity > 0) {
      newCart = cart.map((product) => {
        return product.productId === productId ? { ...product, quantity } : product
      })
    } else {
      newCart = cart.filter((product) => product.productId !== productId)
    }
    setCart(newCart)
  }

  function getQuantity(productId: number): number {
    if (!Array.isArray(cart)) return 0
    return (cart.find((p) => p.productId === productId) || {}).quantity || 0
  }

  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/products">Products</NavLink>
          {cart.length > 0 && <NavLink to="/checkout">Checkout</NavLink>}
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <BrowseProducts
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                getQuantity={getQuantity}
                cart={cart}
              />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout cart={[]} />
              </Route>
            )}
            <Redirect to="/products" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default PrimaryLayout
