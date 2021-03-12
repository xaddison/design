import {ApiClass} from '@microsoft/api-extractor-model'
import {config} from '../config'
import {createId, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {DocumentValue} from './types'

export function transformClass(node: ApiClass, releaseDoc: DocumentValue): DocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  return {
    _type: 'api.class',
    _id: createId(node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    releaseTag: config.releaseTags[node.releaseTag],
  }
}
