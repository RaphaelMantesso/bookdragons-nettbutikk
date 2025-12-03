import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Author } from '@/payload-types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  const author = await payload.findByID({
    collection: 'authors',
    id: parseInt(id),
  })

  if (!author) {
    notFound()
  }

  // Find books by this author
  const { docs: books } = await payload.find({
    collection: 'books',
    where: {
      author: {
        equals: author.id,
      },
    },
    limit: 100,
  })

  return (
    <div>
      <div className="author-detail">
        {author.image && typeof author.image === 'object' && (
          <img
            src={author.image.url || ''}
            alt={author.name}
            className="author-detail-image"
          />
        )}
        {(!author.image || typeof author.image !== 'object') && (
          <div className="author-detail-image author-placeholder">👤</div>
        )}
        <div className="author-detail-info">
          <h1>{author.name}</h1>
          {author.bio && <p className="author-bio">{author.bio}</p>}
        </div>
      </div>

      <h2 className="section-title">Bøker av {author.name}</h2>

      {books.length === 0 ? (
        <p>Ingen bøker fra denne forfatteren ennå.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => {
            const stockText = book.stock > 0 ? `${book.stock} på lager` : 'Ikke på lager'
            const stockClass = book.stock > 0 ? 'in-stock' : 'out-of-stock'

            return (
              <Link href={`/books/${book.id}`} key={book.id} className="book-card">
                {book.coverImage && typeof book.coverImage === 'object' && (
                  <img
                    src={book.coverImage.url || ''}
                    alt={book.title}
                    className="book-card-image"
                  />
                )}
                {(!book.coverImage || typeof book.coverImage !== 'object') && (
                  <div className="book-card-image book-placeholder-small">📖</div>
                )}
                <div className="book-card-content">
                  <h2 className="book-card-title">{book.title}</h2>
                  <p className="book-card-price">{book.price} kr</p>
                  <p className={`book-card-stock ${stockClass}`}>{stockText}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

