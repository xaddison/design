import {DATA_QUERY} from './queries'
import {getReleaseMenu} from '$components'
import {isRecord, isString} from '$lib/types'
import {usePreviewSubscription} from '$sanity'

export function useReferencePageData(props: {
  data: unknown
  params: {version: string}
  preview: boolean
}) {
  const {data: dataProp, params, preview} = props
  const basePath = `/reference/${params.version}`

  const {data} = usePreviewSubscription(DATA_QUERY, {
    enabled: preview,
    initialData: dataProp,
    params,
  })

  const release =
    isRecord(data) && isRecord(data.release) && isString(data.release.version) && data.release

  const menu = release ? getReleaseMenu(release, basePath) : undefined

  return {data, menu}
}
