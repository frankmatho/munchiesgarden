import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {

            console.log("Item being added:", item);

            const normalizedItem = {
                id: item.id || item._id,
                name: item.food_title || item.name,
                image: item.image_url || item.image,
                price: item.price,
                quantity: 1,
            }

            const existingItem = prevItems.find((cartItem) => cartItem.id === normalizedItem.id);
            if (existingItem) {
                // If the item already exists, increase its quantity
                return prevItems.map((cartItem) =>
                    cartItem.id === normalizedItem.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add the new item with a default quantity of 1
                return [...prevItems, normalizedItem];
            }
        });
    };

    const updateCart = (updatedItem) => {
        if (!updatedItem || (Array.isArray(updatedItem) && updatedItem.some(item => !item.id))) {
            console.error('Invalid item(s) passed to updateCart:', updatedItem);
            return;
        }
    
        if (Array.isArray(updatedItem)) {
            setCartItems((prevItems) =>
                prevItems.map((item) => {
                    const foundItem = updatedItem.find((uItem) => uItem.id === item.id);
                    return foundItem
                        ? { ...item, ...foundItem, quantity: foundItem.quantity || item.quantity }
                        : item;
                })
            );
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === updatedItem.id
                        ? { ...item, ...updatedItem, quantity: updatedItem.quantity || item.quantity }
                        : item
                )
            );
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};