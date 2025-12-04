import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { BookCard } from '@/components'

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
    <article>
      <div className="genre-detail">
        <h1>{genre.name}</h1>
        {genre.description && <p className="genre-description">{genre.description}</p>}
      </div>

      <h2 className="section-title">Bøker i sjangeren {genre.name}</h2>

      {books.length === 0 ? (
        <p>Ingen bøker i denne sjangeren ennå.</p>
      ) : (
        <section className="books-grid" aria-label={`Bøker i sjangeren ${genre.name}`}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </article>
  )
}
