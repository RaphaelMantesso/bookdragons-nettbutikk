import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Author, Genre } from '@/payload-types'
import AddToCartButton from './AddToCartButton'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BookPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  const book = await payload.findByID({
    collection: 'books',
    id: parseInt(id),
    depth: 1,
  })

  if (!book) {
    notFound()
  }

  const author = book.author as Author
  const genres = book.genres as Genre[]
  const ageLabels: Record<string, string> = {
    children: 'Barn',
    youth: 'Ungdom',
    adult: 'Voksen',
  }

  return (
    <div className="book-detail">
      <div className="book-detail-image">
        {book.coverImage && typeof book.coverImage === 'object' ? (
          <img src={book.coverImage.url || ''} alt={book.title} />
        ) : (
          <div className="book-placeholder">📖</div>
        )}
      </div>
      <div className="book-detail-info">
        <h1>{book.title}</h1>
        {author && <p className="book-author">Av {author.name}</p>}
        
        <p className="book-price">{book.price} kr</p>
        
        <p className={`book-stock ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {book.stock > 0 ? `${book.stock} på lager` : 'Ikke på lager'}
        </p>

        {book.ageGroup && (
          <p className="book-age">Aldersgruppe: {ageLabels[book.ageGroup]}</p>
        )}

        {genres && genres.length > 0 && (
          <p className="book-genres">
            Sjangere: {genres.map((g) => g.name).join(', ')}
          </p>
        )}

        {book.description && (
          <div className="book-description">
            <h3>Beskrivelse</h3>
            <p>{book.description}</p>
          </div>
        )}

        {book.stock > 0 && (
          <AddToCartButton
            book={{
              id: book.id,
              title: book.title,
              price: book.price,
            }}
          />
        )}
      </div>
    </div>
  )
}

