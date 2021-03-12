import {Box, Select} from '@sanity/ui'
import groq from 'groq'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, PageLayout, ReferenceArticle, useApp} from '$components'
import {features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'
import {getClient} from '$sanity'

const PACKAGES_QUERY = groq`
  * [_type == "api.package" && name == $name] {
    releases[]->{
      version,
      members[]->{
        'slug': slug.current
      }
    }
  }[0]
`

export async function getStaticProps(opts: {
  params: {name?: string; version: string; slug: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = opts

  // @todo: remove this hard-coding
  params.name = '@sanity/ui'

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const params = {name: '@sanity/ui'}
  const data: unknown = await getClient(features.preview).fetch(PACKAGES_QUERY, params)
  const paths: {params: {version: string; slug: string}}[] = []

  if (isRecord(data) && isArray(data.releases)) {
    for (const release of data.releases) {
      if (isRecord(release) && isArray(release.members)) {
        for (const member of release.members) {
          if (isString(release.version) && isRecord(member) && isString(member.slug)) {
            paths.push({params: {version: release.version, slug: member.slug}})
          }
        }
      }
    }
  }

  return {paths, fallback: false}
}

function ReferenceArticlePage({params}: any) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const release = isRecord(data) && data.release
  const currentMember =
    (isRecord(release) && isRecord(release.currentMember) && release.currentMember) || null
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const releases = pkg?.releases && isArray(pkg.releases) ? pkg.releases : []

  const handleVersionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      pushState({
        pathname: `/reference/${event.currentTarget.value}`,
      })
    },
    [pushState]
  )

  const menuHeader = (
    <Box padding={[3, 4, 5]} style={{borderBottom: '1px solid var(--card-border-color)'}}>
      <Select onChange={handleVersionChange} value={params.version}>
        {releases &&
          releases.map((release: any) => (
            <option key={release.version} value={release.version}>
              v{release.version}
            </option>
          ))}
      </Select>
    </Box>
  )

  return (
    <AppLayout>
      <Head>
        {currentMember && (
          <title>
            {currentMember.name} – v{params.version} – Sanity UI
          </title>
        )}
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {currentMember && <ReferenceArticle data={currentMember} />}
      </PageLayout>
    </AppLayout>
  )
}

export default ReferenceArticlePage
