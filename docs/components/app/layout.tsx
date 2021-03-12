import {Card, Flex} from '@sanity/ui'
import React from 'react'
import {AppBanner} from './banner'
import {AppFooter} from './footer'
import {AppNavbar} from './navbar'

export function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <Flex direction="column" height="fill">
      <AppBanner />
      <AppNavbar />
      <Card flex={1} style={{minHeight: 'auto'}}>
        {children}
      </Card>
      <AppFooter />
    </Flex>
  )
}
