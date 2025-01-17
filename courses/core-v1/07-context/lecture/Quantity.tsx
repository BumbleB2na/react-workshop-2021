import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity({ quantity, onChange }): React.ReactElement {
  function subtract() {
    if (quantity > 0) {
      onChange(quantity - 1)
    }
  }

  function add() {
    onChange(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
            aria-label="Remove an item"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            pattern="[0-9]"
            onChange={(event) => {
              const sanitizedValue = event.target.value.replace(/[^0-9]/g, '')
              const newVal = parseInt(sanitizedValue)
              onChange(isNaN(newVal) ? 0 : newVal)
            }}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button" aria-label="Add an item">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
