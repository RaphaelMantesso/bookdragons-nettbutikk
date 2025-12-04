'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('bookdragons-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
    const newCart = cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCart(newCart)
    localStorage.setItem('bookdragons-cart', JSON.stringify(newCart))
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
    localStorage.setItem('bookdragons-cart', JSON.stringify(newCart))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="page-title">Handlekurv</h1>

      {cart.length === 0 ? (
        <div className="cart-empty" role="status">
          <p>Handlekurven er tom.</p>
          <Link href="/" className="btn btn-primary">
            Se våre bøker
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <ul className="cart-items" role="list" aria-label="Produkter i handlekurven">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-price">{item.price} kr</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Reduser antall av ${item.title}`}
                  >
                    -
                  </button>
                  <span className="quantity" aria-live="polite" aria-label="Antall">
                    {item.quantity}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Øk antall av ${item.title}`}
                  >
                    +
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Fjern ${item.title} fra handlekurven`}
                  >
                    Fjern
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary" aria-live="polite">
            <p className="cart-total">
              <strong>Totalt: {totalPrice} kr</strong>
            </p>
            <Link href="/checkout" className="btn btn-primary">
              Gå til kassen
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
