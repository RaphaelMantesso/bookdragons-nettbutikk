import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { BookCard } from '@/components'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  const author = await payload.findByID({
    collection: 'authors',
    id: parseInt(id),
    depth: 1,
  })

  if (!author) {
    notFound()
  }

  const authorImage = author.image as Media | null

  // Find books by this author
  const { docs: books } = await payload.find({
    collection: 'books',
    where: {
      author: {
        equals: author.id,
      },
    },
    depth: 1,
    limit: 100,
  })

  return (
    <article>
      <div className="author-detail">
        {authorImage?.url ? (
          <img
            src={authorImage.sizes?.card?.url || authorImage.url}
            alt={authorImage.alt || author.name}
            className="author-detail-image"
          />
        ) : (
          <div
            className="author-detail-image author-placeholder"
            role="img"
            aria-label="Ingen bilde av forfatter"
          >
            👤
          </div>
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
        <section className="books-grid" aria-label={`Bøker av ${author.name}`}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </article>
  )
}
