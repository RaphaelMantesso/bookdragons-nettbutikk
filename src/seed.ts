import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // Create authors
  const author1 = await payload.create({
    collection: 'authors',
    data: {
      name: 'Jo Nesbø',
      bio: 'Jo Nesbø er en norsk forfatter, musiker og tidligere fotballspiller. Han er best kjent for sine krimromaner om Harry Hole.',
    },
  })

  const author2 = await payload.create({
    collection: 'authors',
    data: {
      name: 'Maja Lunde',
      bio: 'Maja Lunde er en norsk forfatter og manusforfatter. Hun har skrevet flere bøker, inkludert den internasjonale bestselgeren Bienes historie.',
    },
  })

  const author3 = await payload.create({
    collection: 'authors',
    data: {
      name: 'Roald Dahl',
      bio: 'Roald Dahl var en britisk-norsk forfatter kjent for sine barnebøker som Charlie og sjokoladefabrikken, Heksene og Matilda.',
    },
  })

  console.log('✅ Authors created')

  // Create genres
  const genre1 = await payload.create({
    collection: 'genres',
    data: {
      name: 'Krim',
      description: 'Spennende kriminalromaner og thrillere.',
    },
  })

  const genre2 = await payload.create({
    collection: 'genres',
    data: {
      name: 'Skjønnlitteratur',
      description: 'Romaner og noveller.',
    },
  })

  const genre3 = await payload.create({
    collection: 'genres',
    data: {
      name: 'Barnebøker',
      description: 'Bøker for barn i alle aldre.',
    },
  })

  console.log('✅ Genres created')

  // Create books
  await payload.create({
    collection: 'books',
    data: {
      title: 'Snømannen',
      author: author1.id,
      genres: [genre1.id],
      price: 149,
      stock: 3,
      ageGroup: 'adult',
      description: 'Harry Hole jakter på en seriemorder som bygger snømenn ved åstedene sine.',
    },
  })

  await payload.create({
    collection: 'books',
    data: {
      title: 'Bienes historie',
      author: author2.id,
      genres: [genre2.id],
      price: 199,
      stock: 5,
      ageGroup: 'adult',
      description: 'En roman om menneskets forhold til naturen, fortalt gjennom tre generasjoner.',
    },
  })

  await payload.create({
    collection: 'books',
    data: {
      title: 'Matilda',
      author: author3.id,
      genres: [genre3.id],
      price: 129,
      stock: 7,
      ageGroup: 'children',
      description: 'Historien om den lille jenta Matilda som elsker bøker og har magiske evner.',
    },
  })

  await payload.create({
    collection: 'books',
    data: {
      title: 'Kniv',
      author: author1.id,
      genres: [genre1.id],
      price: 179,
      stock: 2,
      ageGroup: 'adult',
      description: 'Harry Hole våkner opp etter en fyllekveld med blod på hendene og ingen minner.',
    },
  })

  await payload.create({
    collection: 'books',
    data: {
      title: 'Heksene',
      author: author3.id,
      genres: [genre3.id],
      price: 99,
      stock: 0,
      ageGroup: 'children',
      description: 'En gutt oppdager at hekser finnes, og de hater barn!',
    },
  })

  console.log('✅ Books created')
  console.log('🎉 Seeding complete!')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Error seeding:', err)
  process.exit(1)
})
