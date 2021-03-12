import {ApiFunction, Parameter} from '@microsoft/api-extractor-model'
import {config} from '../config'
import {createId, hash, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {DocumentValue} from './types'

export function transformFunction(node: ApiFunction, releaseDoc: DocumentValue): DocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)
  const isReactComponentType = _functionIsReactComponentType(node)
  const propsType = isReactComponentType ? _functionPropsType(node) : undefined

  return {
    _type: 'api.function',
    _id: createId(node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    parameters: node.parameters.map((p) => transformFunctionParameter(node, p)),
    returnType: transformTokens(
      node.excerptTokens.slice(
        node.returnTypeExcerpt.tokenRange.startIndex,
        node.returnTypeExcerpt.tokenRange.endIndex
      )
    ),
    releaseTag: config.releaseTags[node.releaseTag],
    isReactComponentType,
    propsType,
  }
}

function transformFunctionParameter(node: ApiFunction, param: Parameter) {
  return {
    _type: 'api.functionParameter',
    _key: hash(param.name),
    name: param.name,
    type: transformTokens(
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _functionIsReactComponentType(node: ApiFunction) {
  const returnTypeTokens = node.excerptTokens.slice(
    node.returnTypeExcerpt.tokenRange.startIndex,
    node.returnTypeExcerpt.tokenRange.endIndex
  )

  const returnTypeCode = returnTypeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const returnsReactElement = returnTypeCode === 'React.ReactElement'
  const returnsReactNode = returnTypeCode === 'React.ReactNode'

  // console.log('returnTypeCode', returnTypeCode)
  const returnsReactPortal =
    returnTypeCode === 'React.ReactPortal' || returnTypeCode.startsWith('React.ReactPortal |')

  if (returnsReactElement || returnsReactNode || returnsReactPortal) {
    return true
  }

  return false
}

function _functionPropsType(node: ApiFunction) {
  const propsParam = node.parameters[0] && node.parameters[0].name === 'props' && node.parameters[0]

  if (propsParam) {
    const propsTokens = transformTokens(
      node.excerptTokens.slice(
        propsParam.parameterTypeExcerpt.tokenRange.startIndex,
        propsParam.parameterTypeExcerpt.tokenRange.endIndex
      )
    )

    if (propsTokens.length && propsTokens[0]._type === 'api.reference') {
      return propsTokens[0].reference
    }
  }

  console.warn(`WARN: could not detect props type for \`${node.name}\` (function)`)

  return undefined
}
