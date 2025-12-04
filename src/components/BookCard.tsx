import Link from 'next/link'
import type { Book, Author, Media } from '@/payload-types'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const author = book.author as Author | null
  const coverImage = book.coverImage as Media | null
  const stockText = book.stock > 0 ? `${book.stock} på lager` : 'Ikke på lager'
  const stockClass = book.stock > 0 ? 'in-stock' : 'out-of-stock'

  return (
    <Link
      href={`/books/${book.id}`}
      className="book-card"
      aria-label={`${book.title} av ${author?.name || 'ukjent forfatter'}, ${book.price} kr`}
    >
      {coverImage?.url ? (
        <img
          src={coverImage.sizes?.card?.url || coverImage.url}
          alt={coverImage.alt || book.title}
          className="book-card-image"
          loading="lazy"
        />
      ) : (
        <div
          className="book-card-image book-card-placeholder"
          role="img"
          aria-label="Ingen omslagsbilde"
        >
          📖
        </div>
      )}
      <div className="book-card-content">
        <h2 className="book-card-title">{book.title}</h2>
        <p className="book-card-author">{author?.name || 'Ukjent forfatter'}</p>
        <p className="book-card-price">{book.price} kr</p>
        <p className={`book-card-stock ${stockClass}`} aria-live="polite">
          {stockText}
        </p>
      </div>
    </Link>
  )
}

