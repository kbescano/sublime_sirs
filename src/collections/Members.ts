import { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'surname', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'address', type: 'text' }, // Needed for your "Address" column
    { name: 'batchName', type: 'text' },    // Needed for your "Batch" sub-text
    { 
      name: 'initiationDate', 
      type: 'date', 
    },
  ],
}