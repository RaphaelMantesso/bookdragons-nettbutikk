'use client'

import { useState } from 'react'

interface Props {
  book: {
    id: number
    title: string
    price: number
  }
}

export default function AddToCartButton({ book }: Props) {
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    const savedCart = localStorage.getItem('bookdragons-cart')
    const cart = savedCart ? JSON.parse(savedCart) : []

    const existingItem = cart.find((item: { id: number }) => item.id === book.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      })
    }

    localStorage.setItem('bookdragons-cart', JSON.stringify(cart))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button className="btn btn-primary add-to-cart-btn" onClick={addToCart}>
      {added ? '✓ Lagt til!' : 'Legg i handlekurv'}
    </button>
  )
}

