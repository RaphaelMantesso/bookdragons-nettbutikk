'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('bookdragons-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          items: cart.map((item) => ({
            book: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (response.ok) {
        localStorage.removeItem('bookdragons-cart')
        setOrderPlaced(true)
      }
    } catch (error) {
      console.error('Error placing order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <h1>Takk for din bestilling!</h1>
        <p>Vi har mottatt bestillingen din og vil kontakte deg snart.</p>
        <button className="btn btn-primary" onClick={() => router.push('/')}>
          Tilbake til forsiden
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Handlekurven er tom</h1>
        <button className="btn btn-primary" onClick={() => router.push('/')}>
          Se våre bøker
        </button>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1 className="page-title">Kasse</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Dine opplysninger</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Navn</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sender...' : 'Send bestilling'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Din bestilling</h2>
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>{item.price * item.quantity} kr</span>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Totalt: {totalPrice} kr</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

