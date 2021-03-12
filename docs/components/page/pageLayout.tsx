import {Box, Card, Flex, rem} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'
import {PageHeader} from './pageHeader'
import {NavMenu} from '$lib/nav'

interface PageLayoutProps {
  children: React.ReactNode
  menu?: NavMenu
  menuHeader?: React.ReactNode
}

const Root = styled(Flex)`
  position: relative;
`

const HeaderBox = styled(Box).attrs({forwardedAs: 'aside'})`
  min-width: 10em;
  max-width: 22em;
`

const ContextBox = styled(Box)`
  ${({theme}) => css`
    @media (min-width: ${rem(theme.sanity.media[1])}) {
      min-width: 30rem;
    }
  `}
`

const ContentCard = styled(Card).attrs({forwardedAs: 'main'})`
  min-height: 100%;
`

export function PageLayout({children, menu, menuHeader}: PageLayoutProps) {
  return (
    <Root>
      {menu && (
        <HeaderBox display={['none', 'none', 'block']} flex={1}>
          <PageHeader header={menuHeader} menu={menu} />
        </HeaderBox>
      )}

      <ContextBox flex={menu ? 3 : undefined}>
        <ContentCard id="content">{children}</ContentCard>
      </ContextBox>
    </Root>
  )
}
