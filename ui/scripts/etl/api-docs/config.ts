import path from 'path'
import pkg from '../../../package.json'

export const config = {
  context: path.resolve(__dirname, '../../..'),

  publish: {
    fs: true,
    sanity: true,
  },

  package: {
    scope: '@sanity',
    name: 'ui',
    version: process.env.PACKAGE_VERSION || pkg.version,
  },

  releaseTags: {
    0: undefined,
    1: 'internal',
    2: 'alpha',
    3: 'beta',
    4: 'public',
  },
}
