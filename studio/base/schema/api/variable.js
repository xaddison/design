export const apiVariable = {
  type: 'document',
  name: 'api.variable',
  title: 'Variable',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },

    {
      type: 'reference',
      name: 'release',
      title: 'Release',
      to: [{type: 'api.release'}],
      weak: true,
    },

    {
      type: 'boolean',
      name: 'isReactComponentType',
      title: 'Is React component',
      options: {
        layout: 'checkbox',
      },
    },

    {
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    },

    {
      type: 'string',
      name: 'releaseTag',
      title: 'Release tag',
      options: {
        list: [
          {value: 'beta', title: 'Beta'},
          {value: 'public', title: 'Public'},
        ],
      },
    },

    {
      type: 'api.tokens',
      name: 'type',
      title: 'Type',
    },
  ],

  readOnly: true,
}
