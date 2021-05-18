/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

const FavouriteProductContext = React.createContext<FavoriteProductContextValue>({
	isFavorite() {
		return false
	},
	addFavorite() {},
	removeFavorite() {}
})

export const FavoriteProductProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = React.useState<number[]>(() => {
		return storage.getFavorites()
	})

	const firstRenderRef = React.useRef(true)

	React.useEffect(() => {
		if(!firstRenderRef.current) {
			storage.updateFavorites(favorites)
		}
		firstRenderRef.current = false
	}, [favorites])

	const value: FavoriteProductContextValue = {
		isFavorite(productId) {
  		return favorites.includes(productId)
		},
		removeFavorite(productId) {
      // Remove favorites by filtering an array down to everything that
      // doesn't match the productId
      setFavorites(favorites.filter((id) => id !== productId))
		},
		addFavorite(productId) {
      // Add favorites by concatenating two arrays together. If favorites
      // looks like this: [1, 2] and you concat an array that looks
      // like this [3], the end result is [1,2,3]
      setFavorites(favorites.concat([productId]))
		}
	}

  return <FavouriteProductContext.Provider value={value} children={children} />
}

export function useFavoriteProduct() {
	return React.useContext(FavouriteProductContext)
}

interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}
