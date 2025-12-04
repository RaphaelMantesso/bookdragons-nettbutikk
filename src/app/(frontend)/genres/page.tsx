import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function GenresPage() {
  const payload = await getPayload({ config })

  const { docs: genres } = await payload.find({
    collection: 'genres',
    limit: 100,
  })

  return (
    <div>
      <h1 className="page-title">Sjangere</h1>

      <section className="genres-grid" aria-label="Liste over sjangere">
        {genres.map((genre) => (
          <Link
            href={`/genres/${genre.id}`}
            key={genre.id}
            className="genre-card"
            aria-label={`Se bøker i sjangeren ${genre.name}`}
          >
            <h2 className="genre-card-name">{genre.name}</h2>
            {genre.description && <p className="genre-card-description">{genre.description}</p>}
          </Link>
        ))}
      </section>
    </div>
  )
}
