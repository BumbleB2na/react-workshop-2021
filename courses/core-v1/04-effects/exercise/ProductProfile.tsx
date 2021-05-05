import * as React from 'react'
import { Columns, Column } from 'react-flex-columns'
import { useParams } from 'react-router-dom'
import Heading from 'YesterTech/Heading'
import Quantity from 'YesterTech/Quantity'
import Tiles from 'YesterTech/Tiles'
import StarRatings from 'YesterTech/StarRatings'
import ProductImage from 'YesterTech/ProductImage'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import ProductTile from 'YesterTech/ProductTile'
import { useProduct } from 'YesterTech/useProduct'
import { useAuthState } from 'YesterTech/AuthState'
import './styles.scss'
import { Chat } from './Chat'
import { useEffect, useState } from 'react'
import ms from 'ms'

function ProductProfile() {
  const [chatIsVisible, setChatIsVisible] = useState(true);
  const [chatIsDismissing, setChatIsDismissing] = useState(false);
  let { productId } = useParams<{ productId: any }>()
  let { user } = useAuthState()
  productId = parseInt(productId, 10)

  const CHAT_DISMISS_DELAY = ms('5 seconds');  // 5 * 60
  const CHAT_DISMISSING_LIFESPAN = ms('.6 seconds');  // .6 * 60
  useEffect(() => {
		const dismissChatId = setTimeout(() => {
			setChatIsDismissing(true);
		}, CHAT_DISMISS_DELAY);
		
		const hideChatId = setTimeout(() => {
			setChatIsVisible(false);
		}, CHAT_DISMISS_DELAY + CHAT_DISMISSING_LIFESPAN);

		return () => { clearTimeout(dismissChatId); clearTimeout(hideChatId); }
  }, [chatIsVisible, CHAT_DISMISS_DELAY, chatIsDismissing, CHAT_DISMISSING_LIFESPAN]);

  // Cart
  let { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  let quantity = getQuantity(productId)

  // Product
  let product = useProduct(productId)

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {chatIsVisible ? <Chat isDismissing={chatIsDismissing} sender={user?.name || 'Customer'} /> : null}
      <div className="spacing">
        <Columns gutters>
          <Column>
            <ProductImage src={product.imagePath} alt={product.name} size={15} />
          </Column>
          <Column flex className="spacing">
            <Heading>{product.name}</Heading>
            <StarRatings rating={product.rating} />
            <hr />
            <Columns split>
              <Column>
                <div className="text-small">
                  <div>
                    <strong>Price: ${product.price.toFixed(2)}</strong>
                  </div>
                  <div>Brand: {product.brand}</div>
                  <div>Category: {product.category}</div>
                  <div>Condition: {product.condition}</div>
                </div>
              </Column>
              <Column className="spacing-small">
                <ShoppingCartButton
                  onClick={() => addToCart(productId, product.name, product.price)}
                  quantity={quantity}
                />
                {quantity > 0 && (
                  <div className="align-right">
                    <Quantity onChange={(q) => updateQuantity(productId, q)} quantity={quantity} />
                  </div>
                )}
              </Column>
            </Columns>
            <p>{product.description}</p>
          </Column>
        </Columns>

        {Array.isArray(product.relatedProducts) && (
          <>
            <hr />
            <div>
              <Heading as="h2" size={4}>
                Related Products
              </Heading>
              <Tiles>
                {product.relatedProducts.map((productId: any) => (
                  <ProductTile key={productId} productId={productId} />
                ))}
              </Tiles>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductProfile
