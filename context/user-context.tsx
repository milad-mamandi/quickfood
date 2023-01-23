import { createContext, useEffect, useState } from 'react'

interface UserContextInterface {
    cart: string[],
    addToCart: (item: string) => void,
    removeFromCart: (item: string) => void,
    deleteFromCart: (item: string) => void,
    clearCart: () => void,
}

const UserContext = createContext<UserContextInterface>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    deleteFromCart: () => { },
    clearCart: () => { },
})

export const UserContextProvider = (props: any) => {
    const [cartData, setCartData] = useState<Array<string>>([])

    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem('cart') || "[]"))
    }, [])

    const addToCart = (item: string) => {
        setCartData((prev) => [...prev, item])
        const lsData = JSON.parse(localStorage.getItem('cart') || "[]")
        localStorage.setItem('cart', JSON.stringify([...lsData, item]))
    }

    const removeFromCart = (item: string) => {
        const lsData: string[] = JSON.parse(localStorage.getItem('cart') || "[]")
        const index = lsData.indexOf(item)
        lsData.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(lsData))
        setCartData(lsData)
    }

    const deleteFromCart = (item : string) => {
        setCartData(prev => prev.filter(i => i !== item))
        const lsData: string[] = JSON.parse(localStorage.getItem('cart') || "[]")
        localStorage.setItem('cart', JSON.stringify(lsData.filter(i => i !== item)))
    }

    const clearCart = () => {
        setCartData([])
        localStorage.setItem('cart', JSON.stringify([]))
    }

    const contextValue = {
        cart: cartData,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        deleteFromCart: deleteFromCart,
        clearCart: clearCart,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext