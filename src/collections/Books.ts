import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    description: 'Bøker i sortimentet',
    defaultColumns: ['title', 'author', 'price', 'stock', 'updatedAt'],
  },
  labels: {
    singular: 'Bok',
    plural: 'Bøker',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tittel',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Forfatter',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
      admin: {
        description: 'Kort beskrivelse av boken',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Pris (NOK)',
      required: true,
      min: 0,
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Antall på lager',
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'genres',
      type: 'relationship',
      label: 'Sjangere',
      relationTo: 'genres',
      hasMany: true,
    },
    {
      name: 'ageGroup',
      type: 'select',
      label: 'Aldersgruppe',
      options: [
        { label: 'Barn (0-8 år)', value: 'children' },
        { label: 'Ungdom (9-15 år)', value: 'youth' },
        { label: 'Voksen (16+ år)', value: 'adult' },
      ],
      defaultValue: 'adult',
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Omslagsbilde',
      relationTo: 'media',
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Flere bilder',
      admin: {
        description: 'Legg til flere bilder av boken (tilstand, etc.)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Bilde',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

