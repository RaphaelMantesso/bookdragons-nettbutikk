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
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
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
        <div className="cart-empty">
          <p>Handlekurven er tom.</p>
          <Link href="/" className="btn btn-primary">
            Se våre bøker
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">{item.price} kr</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Fjern
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
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

