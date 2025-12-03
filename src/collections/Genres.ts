import type { CollectionConfig } from 'payload'

export const Genres: CollectionConfig = {
  slug: 'genres',
  admin: {
    useAsTitle: 'name',
    description: 'Sjangere for kategorisering av bøker',
    defaultColumns: ['name', 'updatedAt'],
  },
  labels: {
    singular: 'Sjanger',
    plural: 'Sjangere',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Navn',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
      admin: {
        description: 'Beskrivelse av sjangeren for kundene',
      },
    },
  ],
}

