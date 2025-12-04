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
        <a href="#main-content" className="skip-link">
          Hopp til hovedinnhold
        </a>
        <header className="header" role="banner">
          <div className="header-content">
            <Link href="/" className="logo" aria-label="BookDragons - Gå til forsiden">
              📚 BookDragons
            </Link>
            <nav className="nav" role="navigation" aria-label="Hovednavigasjon">
              <Link href="/">Bøker</Link>
              <Link href="/authors">Forfattere</Link>
              <Link href="/genres">Sjangere</Link>
              <Link href="/cart" aria-label="Handlekurv">
                🛒 Handlekurv
              </Link>
            </nav>
          </div>
        </header>
        <main id="main-content" className="main-content" role="main">
          {children}
        </main>
        <footer className="footer" role="contentinfo">
          <p>© 2025 BookDragons - Bruktbokhandel</p>
        </footer>
      </body>
    </html>
  )
}
