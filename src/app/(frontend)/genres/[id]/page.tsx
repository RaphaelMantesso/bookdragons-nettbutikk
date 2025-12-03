import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Author } from '@/payload-types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function GenrePage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  const genre = await payload.findByID({
    collection: 'genres',
    id: parseInt(id),
  })

  if (!genre) {
    notFound()
  }

  // Find books in this genre
  const { docs: books } = await payload.find({
    collection: 'books',
    where: {
      genres: {
        contains: genre.id,
      },
    },
    depth: 1,
    limit: 100,
  })

  return (
    <div>
      <div className="genre-detail">
        <h1>{genre.name}</h1>
        {genre.description && <p className="genre-description">{genre.description}</p>}
      </div>

      <h2 className="section-title">Bøker i sjangeren {genre.name}</h2>

      {books.length === 0 ? (
        <p>Ingen bøker i denne sjangeren ennå.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => {
            const author = book.author as Author
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
                  <p className="book-card-author">{author?.name || 'Ukjent forfatter'}</p>
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

