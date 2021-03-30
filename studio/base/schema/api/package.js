import {PackageIcon} from '@sanity/icons'

export const apiPackage = {
  type: 'document',
  icon: PackageIcon,
  name: 'api.package',
  title: 'Package',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },

    {
      type: 'array',
      name: 'releases',
      title: 'Releases',
      of: [
        {
          type: 'reference',
          title: 'Reference',
          to: [{type: 'api.release'}],
          weak: true,
        },
      ],
    },

    {
      type: 'reference',
      name: 'latestRelease',
      title: 'Latest release',
      to: [{type: 'api.release'}],
      weak: true,
    },
  ],
  readOnly: true,
}
