import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { customerName, customerEmail, customerPhone, items } = body

    // Validate required fields
    if (!customerName || !customerEmail || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Mangler påkrevde felt' },
        { status: 400 }
      )
    }

    // Create the order
    const order = await payload.create({
      collection: 'orders',
      data: {
        customerName,
        customerEmail,
        customerPhone: customerPhone || '',
        items: items.map((item: { book: number; quantity: number }) => ({
          book: item.book,
          quantity: item.quantity,
        })),
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Kunne ikke opprette bestilling' },
      { status: 500 }
    )
  }
}

