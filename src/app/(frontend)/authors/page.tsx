import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

export default async function AuthorsPage() {
  const payload = await getPayload({ config })

  const { docs: authors } = await payload.find({
    collection: 'authors',
    depth: 1,
    limit: 100,
  })

  return (
    <div>
      <h1 className="page-title">Forfattere</h1>

      <section className="authors-grid" aria-label="Liste over forfattere">
        {authors.map((author) => {
          const authorImage = author.image as Media | null
          return (
            <Link
              href={`/authors/${author.id}`}
              key={author.id}
              className="author-card"
              aria-label={`Se bøker av ${author.name}`}
            >
              {authorImage?.url ? (
                <img
                  src={authorImage.sizes?.thumbnail?.url || authorImage.url}
                  alt={authorImage.alt || author.name}
                  className="author-card-image"
                  loading="lazy"
                />
              ) : (
                <div
                  className="author-card-image author-placeholder"
                  role="img"
                  aria-label="Ingen bilde"
                >
                  👤
                </div>
              )}
              <div className="author-card-content">
                <h2 className="author-card-name">{author.name}</h2>
                {author.bio && (
                  <p className="author-card-bio">
                    {author.bio.length > 100 ? `${author.bio.substring(0, 100)}...` : author.bio}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
