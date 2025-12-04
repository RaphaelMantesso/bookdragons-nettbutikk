import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCard } from '@/components'

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

      <section className="books-grid" aria-label="Liste over bøker til salgs">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </div>
  )
}
