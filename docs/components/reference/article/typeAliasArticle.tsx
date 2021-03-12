import {Badge, Card, Code, Heading, Inline, Label, Stack} from '@sanity/ui'
import React from 'react'
import {Comment} from '../comment'

export function ReferenceTypeAliasArticle(props: {data: any}) {
  const {data} = props

  return (
    <>
      <Stack space={4}>
        <Heading as="h1" size={[2, 2, 3, 4]}>
          <code>{data.name}</code>
        </Heading>

        <Inline space={1}>
          {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
        </Inline>
      </Stack>

      {data.comment && <Comment comment={data.comment} />}

      {data.type && (
        <Stack marginY={[4, 4, 5]} space={3}>
          <Label>Type</Label>

          <Card overflow="auto" padding={4} radius={2} shadow={1}>
            <Code language="typescript">
              {[`type ${data.name} = `, data.type.map((t: any) => t.text).join('')].join('')}
            </Code>
          </Card>
        </Stack>
      )}

      <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </>
  )
}
