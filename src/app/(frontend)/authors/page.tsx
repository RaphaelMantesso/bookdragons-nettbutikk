import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Author } from '@/payload-types'

export default async function AuthorsPage() {
  const payload = await getPayload({ config })

  const { docs: authors } = await payload.find({
    collection: 'authors',
    limit: 100,
  })

  return (
    <div>
      <h1 className="page-title">Forfattere</h1>

      <div className="authors-grid">
        {authors.map((author) => (
          <Link href={`/authors/${author.id}`} key={author.id} className="author-card">
            {author.image && typeof author.image === 'object' && (
              <img
                src={author.image.url || ''}
                alt={author.name}
                className="author-card-image"
              />
            )}
            {(!author.image || typeof author.image !== 'object') && (
              <div className="author-card-image author-placeholder">👤</div>
            )}
            <div className="author-card-content">
              <h2 className="author-card-name">{author.name}</h2>
              {author.bio && <p className="author-card-bio">{author.bio.substring(0, 100)}...</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

