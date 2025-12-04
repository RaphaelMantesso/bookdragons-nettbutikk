'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('bookdragons-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Navn er påkrevd'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Navn må være minst 2 tegn'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-post er påkrevd'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ugyldig e-postadresse'
    }

    if (formData.phone && !/^[0-9\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Ugyldig telefonnummer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

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
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Navn *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                autoComplete="name"
              />
              {errors.name && (
                <span id="name-error" className="form-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">E-post *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                autoComplete="email"
              />
              {errors.email && (
                <span id="email-error" className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!errors.phone}
                autoComplete="tel"
              />
              {errors.phone && (
                <span id="phone-error" className="form-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
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
