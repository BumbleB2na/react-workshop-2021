import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from '../../../../../apps/YesterTech/Heading' //import Heading from 'YesterTech/Heading'
import { useState } from 'react'

type CheckoutBillingProps = {
  onSubmit(fields: ReturnType<typeof serializeForm>): void
}

const CheckoutBilling = ({ onSubmit }: CheckoutBillingProps) => {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = serializeForm(event.target as HTMLFormElement, {
      hash: true,
    })
    onSubmit(fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing" autoComplete="off" arial-label="form">
        <fieldset>
          <legend>Billing Info</legend>
          <Heading as="h2" size={3}>
            Billing Info
          </Heading>
          <hr />
          <div className="form-field">
            <label htmlFor="billing_name">Billing Name</label>
            <input id="billing_name" type="text" name="billingName" autoComplete="off" />
          </div>
          <div className="form-field">
            <label htmlFor="billing:address">Billing Address</label>
            <input id="billing:address" type="text" name="billingAddress" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Shipping Info</legend>
          <Heading as="h2" size={3}>
            Shipping Info
          </Heading>

          <label>
            <input
              aria-labelledby=""
              type="checkbox"
              checked={sameAsBilling}
              onChange={() => setSameAsBilling(!sameAsBilling)}
            />{' '}
            <span>Same as Billing</span>
          </label>

          {!sameAsBilling && (
            <div className="spacing">
              <div className="form-field">
                <label htmlFor="shipping:name">Shipping Name</label>
                <input id="shipping:name" type="text" name="shippingName" autoComplete="off" />
              </div>
              <div className="form-field">
                <label htmlFor="shipping:address">Shipping Address</label>
                <input
                  id="shipping:address"
                  type="text"
                  name="shippingAddress"
                  autoComplete="off"
                />
              </div>
            </div>
          )}
        </fieldset>

        <footer>
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  )
}

export default CheckoutBilling
