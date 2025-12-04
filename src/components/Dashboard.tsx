'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
  totalBooks: number
  totalAuthors: number
  totalGenres: number
  pendingOrders: number
  recentOrders: Array<{
    id: number
    customerName: string
    status: string
    createdAt: string
  }>
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [booksRes, authorsRes, genresRes, ordersRes] = await Promise.all([
          fetch('/api/books?limit=0'),
          fetch('/api/authors?limit=0'),
          fetch('/api/genres?limit=0'),
          fetch('/api/orders?limit=5&sort=-createdAt'),
        ])

        const books = await booksRes.json()
        const authors = await authorsRes.json()
        const genres = await genresRes.json()
        const orders = await ordersRes.json()

        const pendingOrders = orders.docs?.filter(
          (o: { status: string }) => o.status === 'pending'
        ).length || 0

        setStats({
          totalBooks: books.totalDocs || 0,
          totalAuthors: authors.totalDocs || 0,
          totalGenres: genres.totalDocs || 0,
          pendingOrders,
          recentOrders: orders.docs || [],
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div style={{ padding: '2rem' }}>Laster...</div>
  }

  if (!stats) {
    return <div style={{ padding: '2rem' }}>Kunne ikke laste statistikk</div>
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  }

  const statNumber: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2d5a27',
    margin: 0,
  }

  const statLabel: React.CSSProperties = {
    color: '#666',
    margin: 0,
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: '🟡 Venter',
      ready: '🟢 Klar',
      completed: '✅ Fullført',
      cancelled: '❌ Kansellert',
    }
    return labels[status] || status
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>
        Velkommen til BookDragons Admin
      </h1>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <p style={statNumber}>{stats.totalBooks}</p>
          <p style={statLabel}>Bøker i sortimentet</p>
        </div>
        <div style={cardStyle}>
          <p style={statNumber}>{stats.totalAuthors}</p>
          <p style={statLabel}>Forfattere</p>
        </div>
        <div style={cardStyle}>
          <p style={statNumber}>{stats.totalGenres}</p>
          <p style={statLabel}>Sjangere</p>
        </div>
        <div style={{ ...cardStyle, background: stats.pendingOrders > 0 ? '#fff3cd' : '#fff' }}>
          <p style={{ ...statNumber, color: stats.pendingOrders > 0 ? '#856404' : '#2d5a27' }}>
            {stats.pendingOrders}
          </p>
          <p style={statLabel}>Ventende bestillinger</p>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Siste bestillinger</h2>
        {stats.recentOrders.length === 0 ? (
          <p style={{ color: '#666' }}>Ingen bestillinger ennå</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Kunde</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Dato</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{order.customerName}</td>
                  <td style={{ padding: '0.5rem' }}>{getStatusLabel(order.status)}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {new Date(order.createdAt).toLocaleDateString('nb-NO')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

