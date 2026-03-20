import { revalidateGlobal } from '@/hooks/revalidationPage'
import { GlobalConfig } from 'payload'

export const HeaderConfig: GlobalConfig = {
  slug: 'header-config',
  access: {
    read: () => true, // Anyone can see the clinic name
  },
  hooks: {
    afterChange: [revalidateGlobal], // Use the global version here
  },
  fields: [
    {
      name: 'topLabel',
      type: 'text',
      label: 'Top Label (e.g., Curated Care)',
      defaultValue: 'A. Mabini Chapter, Order of DeMolay',
      required: true,
    },
    {
      name: 'topDescription',
      type: 'text',
      label: 'Top Description',
      defaultValue: 'Sublime Sirs',
      required: true,
    },
  ],
}