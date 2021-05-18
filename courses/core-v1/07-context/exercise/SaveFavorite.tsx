import * as React from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

import { useFavoriteProduct } from 'YesterTech/FavoriteProductState'

interface SaveFavoriteProps {
  productId: number
}

function SaveFavorite({ productId }: SaveFavoriteProps): React.ReactElement {
  const favourites = useFavoriteProduct()

  const favourite = favourites.isFavorite(productId)

  function handleClick() {
    if (favourite) {
      favourites.removeFavorite(productId)
    } else {
      favourites.addFavorite(productId)
    }
  }

  return (
    <button className="text-small as-link" onClick={handleClick}>
      <span>Favorite</span>
      {favourite ? <HiHeart color="#f00" /> : <HiOutlineHeart />}
    </button>
  )
}

export default SaveFavorite
