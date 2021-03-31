import {Box, Container, Heading, Select} from '@sanity/ui'
import groq from 'groq'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useCallback} from 'react'
import {AppLayout, PageLayout, useApp} from '$components'
import {ReleaseContent} from '$components/reference'
import {features} from '$config'
import {loadReferencePageData} from '$lib/page'
import {isArray, isRecord, isString} from '$lib/types'
import {getClient} from '$sanity'

export async function getStaticProps(opts: {
  params: {name?: string; slug?: string; version: string}
  preview?: boolean
}) {
  const {params, preview = features.preview} = opts

  // @todo: remove this hard-coding
  params.name = '@sanity/ui'
  params.slug = ''

  const pageData = await loadReferencePageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const data = await getClient(features.preview).fetch(groq`
    * [_type == "api.release"] {
      version
    }
  `)

  const paths: {params: {version: string}}[] = []

  if (isArray(data)) {
    for (const release of data) {
      if (isRecord(release) && isString(release.version)) {
        paths.push({params: {version: release.version}})
      }
    }
  }

  return {paths, fallback: false}
}

function ReferenceVersionPage({params}: any) {
  const {data, menu} = useApp()
  const {push: pushState} = useRouter()
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release: any = isRecord(data) && data.release
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
        <title>v{params.version} – Sanity UI</title>
      </Head>

      <PageLayout menu={menu} menuHeader={menuHeader}>
        {release && (
          <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
            <Container width={1}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                v{params.version}
              </Heading>

              <ReleaseContent blocks={release.content} />
            </Container>
          </Box>
        )}
      </PageLayout>
    </AppLayout>
  )
}

export default ReferenceVersionPage
