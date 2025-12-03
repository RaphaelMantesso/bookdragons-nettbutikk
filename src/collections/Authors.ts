import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    description: 'Forfattere i boksamlingen',
    defaultColumns: ['name', 'updatedAt'],
  },
  labels: {
    singular: 'Forfatter',
    plural: 'Forfattere',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Navn',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografi',
      admin: {
        description: 'Kort presentasjon av forfatteren',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Bilde',
      relationTo: 'media',
    },
  ],
}

