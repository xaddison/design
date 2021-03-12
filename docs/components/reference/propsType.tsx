import {
  Badge,
  Box,
  Card,
  Code,
  Container,
  Flex,
  Heading,
  Inline,
  Label,
  Stack,
  Text,
  Tooltip,
} from '@sanity/ui'
import Link from 'next/link'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {Comment, CommentContent} from './comment'
import {useApp} from '$components/app'

export function PropsType(props: any) {
  const {data} = props

  const members = useMemo(() => {
    let mems = data.members

    if (data.extends) {
      for (const ext of data.extends) {
        for (const tok of ext.type) {
          if (tok._type === 'api.reference' && tok.reference.members) {
            mems = mems.concat(
              tok.reference.members.map((inheritedMem: any) => {
                return {
                  ...inheritedMem,
                  inheritedFrom: {
                    name: tok.reference.name,
                    slug: tok.reference.slug,
                  },
                }
              })
            )
          }
        }
      }
    }

    mems.sort((a: any, b: any) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1

      return 0
    })

    return mems
  }, [data])

  return (
    <>
      {members.map((member: any) => member && <PropsTypeMember data={member} key={member._key} />)}

      {/* <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card> */}
    </>
  )
}

function PropsTypeMember(props: any) {
  const {data} = props
  const {params} = useApp()

  const badges: any[] = [
    !data.optional && {
      text: 'Required',
      tone: 'critical',
    },
    data.releaseTag === 'beta' && {
      text: 'Beta',
      tone: 'caution',
    },
  ].filter(Boolean)

  return (
    <Box marginTop={[5, 5, 6]} marginBottom={[4, 4, 5]}>
      <Flex align="center">
        <Heading as="h3" size={[0, 0, 1, 2]}>
          <code>{data.name}</code>
        </Heading>

        {badges.length > 0 && (
          <Box marginLeft={2} style={{lineHeight: 0}}>
            <Inline space={2}>
              {badges.map((badge, badgeIndex) => (
                <Badge
                  fontSize={[1, 1, 2]}
                  key={badgeIndex}
                  tone={badge.tone}
                  style={{margin: '-6px 0'}}
                >
                  {badge.text}
                </Badge>
              ))}
            </Inline>
          </Box>
        )}
      </Flex>

      {data.inheritedFrom && (
        <Box marginY={[4, 4, 5]}>
          <Text as="p" muted size={[1, 1, 2]}>
            Inherited from{' '}
            {data.inheritedFrom.slug && (
              <code>
                <Link href={`/reference/${params?.version}/${data.inheritedFrom.slug?.current}`}>
                  <a>{data.inheritedFrom.name}</a>
                </Link>
              </code>
            )}
            {!data.inheritedFrom.slug && <code>{data.inheritedFrom.name}</code>}.
          </Text>
        </Box>
      )}

      <Stack marginY={[4, 4, 5]} space={3}>
        <Label>Type</Label>

        <Card overflow="auto" padding={4} radius={2} shadow={1}>
          <Code muted>
            {data.type.map((t: any) => (
              <TokenPreview key={t._key} token={t} />
            ))}
          </Code>
        </Card>
      </Stack>

      {data.comment && <Comment comment={data.comment} />}
    </Box>
  )
}

function TokenPreview({token}: any) {
  const {params} = useApp()

  if (token.reference?._id) {
    return (
      <Tooltip content={<ReferenceTooltipContent data={token.reference} />} placement="top" portal>
        <span>
          <Link href={`/reference/${params.version}/${token.reference.name}`}>
            <a>{token.reference.name}</a>
          </Link>
        </span>
      </Tooltip>
    )
  }

  return <>{token.text}</>
}

const CommentBox = styled(Box)`
  border-top: 1px solid var(--card-border-color);

  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`

function ReferenceTooltipContent(props: any) {
  const {data} = props

  if (data._type === 'api.typeAlias') {
    return (
      <Container width={1}>
        <Box padding={4} overflow="auto">
          <Code language="typescript">
            {[`type ${data.name} = `, data.type.map((t: any) => t.text).join('')].join('')}
          </Code>
        </Box>
        {data.comment?.summary && (
          <CommentBox padding={4}>
            <CommentContent blocks={data.comment.summary} />
          </CommentBox>
        )}
      </Container>
    )
  }

  return (
    <Box padding={2}>
      <Code>type</Code>
    </Box>
  )
}
