import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Author, Genre, Media } from '@/payload-types'
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
  const coverImage = book.coverImage as Media | null
  const ageLabels: Record<string, string> = {
    children: 'Barn',
    youth: 'Ungdom',
    adult: 'Voksen',
  }

  return (
    <article className="book-detail">
      <div className="book-detail-image">
        {coverImage?.url ? (
          <img
            src={coverImage.sizes?.large?.url || coverImage.url}
            alt={coverImage.alt || book.title}
            loading="lazy"
          />
        ) : (
          <div className="book-placeholder" role="img" aria-label="Ingen omslagsbilde">
            📖
          </div>
        )}
      </div>
      <div className="book-detail-info">
        <h1>{book.title}</h1>
        {author && (
          <p className="book-author">
            Av <Link href={`/authors/${author.id}`}>{author.name}</Link>
          </p>
        )}

        <p className="book-price">{book.price} kr</p>

        <p
          className={`book-stock ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}
          aria-live="polite"
        >
          {book.stock > 0 ? `${book.stock} på lager` : 'Ikke på lager'}
        </p>

        {book.ageGroup && <p className="book-age">Aldersgruppe: {ageLabels[book.ageGroup]}</p>}

        {genres && genres.length > 0 && (
          <p className="book-genres">
            Sjangere:{' '}
            {genres.map((g, index) => (
              <span key={g.id}>
                <Link href={`/genres/${g.id}`}>{g.name}</Link>
                {index < genres.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}

        {book.description && (
          <section className="book-description" aria-labelledby="description-heading">
            <h2 id="description-heading">Beskrivelse</h2>
            <p>{book.description}</p>
          </section>
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
    </article>
  )
}
