import {ApiInterface, ApiItem, ApiPropertySignature} from '@microsoft/api-extractor-model'
import {config} from '../config'
import {createId, hash, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {DocumentValue} from './types'

export function transformInterface(node: ApiInterface, releaseDoc: DocumentValue): DocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  return {
    _type: 'api.interface',
    _id: createId(node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    extends: node.extendsTypes.map((t, idx) => {
      return {
        _type: 'api.extend',
        _key: `extend${idx}`,
        type: transformTokens(
          t.excerpt.tokens.slice(t.excerpt.tokenRange.startIndex, t.excerpt.tokenRange.endIndex)
        ),
      }
    }),
    members: node.members.map((m) => transformInterfaceMember(m)),
    releaseTag: config.releaseTags[node.releaseTag],
    typeParameters: node.typeParameters.map((p, idx: number) => {
      return {
        _type: 'api.typeParameter',
        _key: `typeParameter${idx}`,
        name: p.name,
        constraintType: transformTokens(
          node.excerptTokens.slice(
            p.constraintExcerpt.tokenRange.startIndex,
            p.constraintExcerpt.tokenRange.endIndex
          )
        ),
        defaultTypeType: transformTokens(
          node.excerptTokens.slice(
            p.defaultTypeExcerpt.tokenRange.startIndex,
            p.defaultTypeExcerpt.tokenRange.endIndex
          )
        ),
      }
    }),
  }
}

function transformInterfaceMember(m: ApiItem) {
  if (m.kind === 'PropertySignature') {
    const mem = m as ApiPropertySignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.property',
      _key: hash(mem.name),
      type: transformTokens(
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
        )
      ),
      name: mem.name,
      comment: docComment ? transformDocComment(docComment) : undefined,
      optional: mem.isOptional,
      releaseTag: config.releaseTags[mem.releaseTag],
    }
  }

  throw new Error(`unknown interface member kind: ${m.kind}`)
}
