import {Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Text)`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  & > a {
    color: var(--card-muted-fg-color);

    @media (hover: hover) {
      &:hover {
        color: var(--card-fg-color);
        text-decoration: none;
      }
    }
  }

  &[aria-selected='true'] > a {
    color: var(--card-link-color);
  }
`

export function NavLink(props: {
  children: React.ReactNode
  href: string
  size?: number | number[]
  style?: React.CSSProperties
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}) {
  const {children, href, ...restProps} = props
  const router = useRouter()

  return (
    <Root {...restProps} aria-selected={href === router.asPath}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </Root>
  )
}
