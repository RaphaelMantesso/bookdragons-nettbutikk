import React from 'react'
import Link from 'next/link'
import './styles.css'

export const metadata = {
  description: 'BookDragons - Din bruktbokhandel på nett',
  title: 'BookDragons',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="no">
      <body>
        <header className="header">
          <div className="header-content">
            <Link href="/" className="logo">
              📚 BookDragons
            </Link>
            <nav className="nav">
              <Link href="/">Bøker</Link>
              <Link href="/authors">Forfattere</Link>
              <Link href="/genres">Sjangere</Link>
              <Link href="/cart">Handlekurv</Link>
            </nav>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <footer className="footer">
          <p>© 2025 BookDragons - Bruktbokhandel</p>
        </footer>
      </body>
    </html>
  )
}
