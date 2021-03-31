import {MenuIcon} from '@sanity/icons'
import {SanityMonogram} from '@sanity/logos'
import {Box, Button, Card, Flex, Inline, Switch, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useCallback, useState} from 'react'
import {useApp} from './hooks'
import {NavDrawer} from './navDrawer'
import {GitHubMark} from '$components'
import {features} from '$config'
import {isArray, isRecord} from '$lib/types'

interface Route {
  hidden: boolean
  href: string
  title: string
}

export function AppNavbar() {
  const {colorScheme, data, menu, setColorScheme} = useApp()
  const nav = isRecord(data) && data.nav
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = isRecord(nav) && isArray(nav.items) ? nav.items : []
  const navItemRecords: Record<string, unknown>[] = navItems.filter(isRecord)
  const navbarRoutes: Route[] = navItemRecords
    .filter((item) => !item.hidden || features.hintHiddenContent)
    .map((item) => ({
      hidden: Boolean(item.hidden),
      href: `/${item.segment || ''}`,
      title: String(item.title),
    }))

  const handleSchemeSwitchChange = useCallback(
    (event) => {
      const {checked} = event.currentTarget

      setColorScheme(checked ? 'dark' : 'light')
    },
    [setColorScheme]
  )

  const handleMenuClose = useCallback(() => setMenuOpen(false), [])

  return (
    <Card
      as="header"
      borderBottom
      paddingY={[2, 3, 4]}
      paddingLeft={[3, 4, 5]}
      paddingRight={[2, 3, 4]}
      style={{minHeight: 'auto'}}
    >
      <Flex as="nav" align="center">
        <Box flex={1}>
          <Flex align="center">
            <Flex align="center" flex={1}>
              <Link href="/" passHref>
                <Inline as="a" space={2}>
                  <SanityMonogram style={{fontSize: 25, verticalAlign: 'top'}} />
                  <Text size={[2, 2, 3]} weight="bold" style={{color: 'var(--card-fg-color)'}}>
                    UI
                  </Text>
                </Inline>
              </Link>
            </Flex>

            <Inline space={2}>
              {navbarRoutes.map((route) => {
                const selected =
                  route.href === '/' ? router.asPath === '/' : router.asPath.startsWith(route.href)

                return (
                  <Link href={route.href} key={route.href} passHref>
                    <Button
                      aria-current={selected ? 'page' : undefined}
                      as="a"
                      fontSize={[2, 2, 3]}
                      mode="bleed"
                      padding={[1, 2, 3]}
                      selected={selected}
                      style={route.hidden ? {opacity: 0.25} : undefined}
                      text={route.title}
                    />
                  </Link>
                )
              })}
            </Inline>
          </Flex>
        </Box>

        <Box marginX={[2, 3, 4]}>
          <Switch
            checked={colorScheme === 'dark'}
            onChange={handleSchemeSwitchChange}
            style={{display: 'block'}}
          />
        </Box>

        <Box>
          <Button
            as="a"
            fontSize={[2, 2, 3]}
            href="https://github.com/sanity-io/design"
            icon={GitHubMark}
            mode="bleed"
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>

        {menu && (
          <Box display={['block', 'block', 'none']} marginLeft={[1, 2, 3]}>
            <Button
              icon={MenuIcon}
              fontSize={[2, 2, 3]}
              mode="bleed"
              onClick={() => setMenuOpen(true)}
            />
          </Box>
        )}

        {menu && <NavDrawer menu={menu} onClose={handleMenuClose} open={menuOpen} />}
      </Flex>
    </Card>
  )
}
