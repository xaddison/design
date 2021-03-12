import {DATA_QUERY} from './queries'
import {getReleaseMenu} from '$components'
import {isRecord, isString} from '$lib/types'
import {getClient} from '$sanity'

export async function loadReferencePageData({
  params = {},
  preview,
}: {
  params: {name?: string; version?: string; slug?: string}
  preview?: boolean
}) {
  const basePath = `/reference/${params.version}`
  const data: unknown = await getClient(preview).fetch(DATA_QUERY, params)
  const release =
    isRecord(data) && isRecord(data.release) && isString(data.release.version) && data.release

  const menu = release && getReleaseMenu(release, basePath)
  const menuData = isRecord(menu) ? {menu} : {}

  return {
    scope: 'reference',
    data,
    ...menuData,
    preview,
  }
}
