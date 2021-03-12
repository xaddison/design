import {
  ApiClass,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiPackage,
  ApiTypeAlias,
  ApiVariable,
} from '@microsoft/api-extractor-model'
import {config} from '../config'
import {isArray, isRecord} from './helpers'
import {transformClass} from './transformClass'
import {transformFunction} from './transformFunction'
import {transformInterface} from './transformInterface'
import {transformTypeAlias} from './transformTypeAlias'
import {transformVariable} from './transformVariable'
import {DocumentValue} from './types'

function transformPackage(
  node: ApiPackage,
  currPackageDoc: DocumentValue | null,
  releaseDoc: DocumentValue
) {
  const _releases = currPackageDoc?.releases

  let releases = isArray(_releases) ? _releases : []

  const release = releases.find((r) => isRecord(r) && r._key === releaseDoc._id)

  if (release) {
    // replace
    releases = releases.map((r) => {
      if (r === release) {
        return {
          _type: 'reference',
          _key: releaseDoc._id,
          _ref: releaseDoc._id,
          _weak: true,
        }
      }

      return r
    })
  } else {
    // add
    releases.push({
      _type: 'reference',
      _key: releaseDoc._id,
      _ref: releaseDoc._id,
      _weak: true,
    })
  }

  return {
    ...currPackageDoc,
    _type: 'api.package',
    _id: node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_'),
    name: node.name,
    releases,
    latestRelease: {
      _type: 'reference',
      _ref: releaseDoc._id,
      _weak: true,
    },
  }
}

function transformMember(member: ApiItem, releaseDoc: DocumentValue) {
  if (member.kind === 'Class') {
    return transformClass(member as ApiClass, releaseDoc)
  }

  if (member.kind === 'Function') {
    return transformFunction(member as ApiFunction, releaseDoc)
  }

  if (member.kind === 'Interface') {
    return transformInterface(member as ApiInterface, releaseDoc)
  }

  if (member.kind === 'TypeAlias') {
    return transformTypeAlias(member as ApiTypeAlias, releaseDoc)
  }

  if (member.kind === 'Variable') {
    return transformVariable(member as ApiVariable, releaseDoc)
  }

  throw new Error(`package: unknown member type: ${member.kind}`)
}

export function transform(
  apiPackage: ApiPackage,
  currPackageDoc: DocumentValue | null
): DocumentValue[] {
  const {version, scope, name} = config.package

  const releaseDoc = {
    _type: 'api.release',
    _id: `${scope}_${name}_${version}`.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_'),
    version,
    members: [] as {
      _type: 'reference'
      _key: string
      _ref: string
      _weak: boolean
    }[],
  }

  const packageDoc = transformPackage(apiPackage, currPackageDoc, releaseDoc)

  const docs: DocumentValue[] = [releaseDoc]

  for (const member of apiPackage.members[0].members) {
    const memberDoc = transformMember(member, releaseDoc)

    docs.push(memberDoc)

    releaseDoc.members.push({
      _type: 'reference',
      _key: memberDoc._id,
      _ref: memberDoc._id,
      _weak: true,
    })
  }

  docs.push(packageDoc)

  return docs
}
