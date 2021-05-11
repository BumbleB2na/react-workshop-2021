import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrimaryHeader from 'YesterTech/PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import { useAuthState } from 'YesterTech/AuthState'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import Account from 'YesterTech/Account'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'

export default function PrimaryLayout(): React.ReactElement {
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <PrimaryContent />
        <PrimaryFooter />
      </div>
    </div>
  )
}

function PrimaryContent(): React.ReactElement {
  const { cart } = useShoppingCart()
  const { authenticated } = useAuthState()

  return (
    <main className="primary-content">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products">
          <ProductsLayout />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        {cart.length && (
          <Route path="/checkout">
            <Checkout />
          </Route>
        )}
        {authenticated && (
          <Route path="/account">
            <Account />
          </Route>
        )}
        <Redirect to="/" />
      </Switch>
    </main>
  )
}
