import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'customerName',
    description: 'Bestillinger fra kunder',
    defaultColumns: ['customerName', 'customerEmail', 'status', 'createdAt'],
  },
  labels: {
    singular: 'Bestilling',
    plural: 'Bestillinger',
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      label: 'Kundens navn',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: 'E-post',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bestilte bøker',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'book',
          type: 'relationship',
          label: 'Bok',
          relationTo: 'books',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Antall',
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'pending',
      options: [
        { label: 'Venter', value: 'pending' },
        { label: 'Klar til henting', value: 'ready' },
        { label: 'Hentet', value: 'completed' },
        { label: 'Kansellert', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notater',
      admin: {
        description: 'Interne notater om bestillingen',
      },
    },
  ],
}

