import BlockContent from '@sanity/block-content-to-react'
import {LinkIcon} from '@sanity/icons'
import {Box, Card, Code, Heading, Stack, Text} from '@sanity/ui'
import dynamic from 'next/dynamic'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {blocksToText} from '../helpers'
import {HeadingType} from '../types'
import {ColorGrid} from './blocks/colorGrid'
import {GroqLogoGrid} from './blocks/groqLogoGrid'
import {NpmPackageBadge} from './blocks/npmPackageBadge'
import {PropertyTable} from './blocks/propertyTable'
import {SanityLogoGrid} from './blocks/sanityLogoGrid'
import {ready} from '$lib/eval'

const CodeExample = dynamic(ready().then(() => import('./blocks/codeExample')) as any, {
  ssr: false,
}) as any

export function ArticleContent({blocks, headings}: {blocks: any[]; headings: HeadingType[]}) {
  const serializers = useMemo(() => buildSerializers(headings), [headings])

  return <BlockContent blocks={blocks} serializers={serializers} />
}

const CODE_LANGUAGES = {
  sh: 'bash',
}

const ListItemText = styled(Text).attrs({forwardedAs: 'li'})`
  position: relative;

  &:before {
    position: absolute;
    content: '•';
    left: -1em;
    width: 1em;
    top: 0.66em;
  }
`

function buildSerializers(headings: HeadingType[]) {
  function CodeSerializer(props: any) {
    const language: 'sh' = props.node.language

    return (
      <Card marginY={[2, 2, 3, 4]} overflow="auto" padding={[3, 3, 4, 5]} radius={2} shadow={1}>
        <Code language={CODE_LANGUAGES[language] || language} muted size={[2, 2, 3]}>
          {props.node.code}
        </Code>
      </Card>
    )
  }

  function CodeExampleSerializer(props: any) {
    if (!props.node || !props.node.code) return null

    const language: 'sh' = props.node.code.language

    return (
      <CodeExample
        code={props.node.code.code}
        hookCode={props.node.hook?.code}
        language={CODE_LANGUAGES[language] || language}
      />
    )
  }

  function NpmPackageBadgeSerializer(props: any) {
    if (!props.node || !props.node.name) return null

    return <NpmPackageBadge name={props.node.name} />
  }

  function PropertyTableSerializer(props: any) {
    const {node} = props

    if (!node) return null

    return <PropertyTable caption={node.caption} properties={node.properties || []} />
  }

  const headingProps: any = {
    h2: {
      box: {
        paddingTop: [4, 4, 5, 6],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [1, 1, 2, 3]},
    },
    h3: {
      box: {
        paddingTop: [3, 3, 4, 5],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [0, 0, 1, 2]},
    },
    h4: {
      box: {
        paddingTop: [2, 2, 3, 4],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [0, 0, 0, 1]},
    },
  }

  const HEADER_RE = /^h\d/

  function BlockSerializer(props: any) {
    const {style = 'normal'} = props.node

    if (HEADER_RE.test(style)) {
      const text = blocksToText([props.node])
      const heading = headings.find((t: any) => t.text === text)

      return (
        <Box {...headingProps[style].box} id={heading && heading.slug}>
          <Heading as={style} {...headingProps[style].heading}>
            {props.children}
            {heading && (
              <>
                &nbsp;&nbsp;
                <a href={`#${heading.slug}`}>
                  <LinkIcon />
                </a>
              </>
            )}
          </Heading>
        </Box>
      )
    }

    if (style === 'blockquote') {
      return (
        <Box as="blockquote" paddingY={4}>
          <Text muted size={[2, 2, 3, 4]}>
            {props.children}
          </Text>
        </Box>
      )
    }

    return (
      <Box paddingY={4}>
        <Text muted size={[2, 2, 3, 4]}>
          {props.children}
        </Text>
      </Box>
    )
  }

  function ListSerializer(props: any) {
    return (
      <Box paddingY={4} paddingLeft={[4, 4, 5]}>
        <Stack as="ul" space={[2, 2, 3]}>
          {props.children}
        </Stack>
      </Box>
    )
  }

  function ListItemSerializer(props: any) {
    return (
      <ListItemText muted size={[2, 2, 3, 4]}>
        {props.children}
      </ListItemText>
    )
  }

  return {
    list: ListSerializer,
    listItem: ListItemSerializer,
    types: {
      block: BlockSerializer,
      code: CodeSerializer,
      codeExample: CodeExampleSerializer,
      npmPackageBadge: NpmPackageBadgeSerializer,
      propertyTable: PropertyTableSerializer,
      'content.colorGrid': ColorGrid,
      'content.groqLogoGrid': GroqLogoGrid,
      'content.sanityLogoGrid': SanityLogoGrid,
    },
  }
}
