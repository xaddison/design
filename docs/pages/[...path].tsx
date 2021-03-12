import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, SEO, useApp} from '$components'
import {PageLayout} from '$components'
import {features} from '$config'
import {loadGlobalPageData, loadGlobalPagePaths} from '$lib/page'
import {isRecord} from '$lib/types'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = features.preview} = opts
  const pageData = await loadGlobalPageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadGlobalPagePaths({preview: features.preview})

  return {paths, fallback: false}
}

export default function PathPage() {
  const {data, menu} = useApp()
  const target = isRecord(data) && isRecord(data.target) && data.target
  const seo: Record<string, any> | null = target ? (target.seo as any) : null

  return (
    <>
      <Head>{target && <title>{target.title} – Sanity UI</title>}</Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        {target && target._type === 'article' && (
          <PageLayout menu={menu} {...(target.layout || {})}>
            <Article article={target} />
          </PageLayout>
        )}

        {target && target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}
