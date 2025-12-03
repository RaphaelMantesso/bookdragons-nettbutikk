import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Book, Author } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: books } = await payload.find({
    collection: 'books',
    limit: 100,
    depth: 1,
  })

  return (
    <div>
      <h1 className="page-title">Våre bøker</h1>

      <div className="books-grid">
        {books.map((book) => {
          const author = book.author as Author
          const stockText = book.stock > 0 ? `${book.stock} på lager` : 'Ikke på lager'
          const stockClass = book.stock > 0 ? 'in-stock' : 'out-of-stock'

          return (
            <Link href={`/books/${book.id}`} key={book.id} className="book-card">
              {book.coverImage && typeof book.coverImage === 'object' && (
                <img src={book.coverImage.url || ''} alt={book.title} className="book-card-image" />
              )}
              {(!book.coverImage || typeof book.coverImage !== 'object') && (
                <div
                  className="book-card-image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                  }}
                >
                  📖
                </div>
              )}
              <div className="book-card-content">
                <h2 className="book-card-title">{book.title}</h2>
                <p className="book-card-author">{author?.name || 'Ukjent forfatter'}</p>
                <p className="book-card-price">{book.price} kr</p>
                <p className={`book-card-stock ${stockClass}`}>{stockText}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
