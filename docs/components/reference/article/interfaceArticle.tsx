import {Badge, Card, Code, Inline, Stack} from '@sanity/ui'
import React from 'react'
import {Comment} from '../comment'
import {PropsType} from '../propsType'
import {H1, H2} from '$components/typography'

export function ReferenceInterfaceArticle(props: {data: any}) {
  const {data} = props

  return (
    <>
      <Stack space={4}>
        <H1>
          <code>{data.name}</code>
        </H1>

        <Inline space={1}>
          {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
        </Inline>
      </Stack>

      {data.comment && <Comment comment={data.comment} />}

      <H2>Members</H2>
      <PropsType data={data} />

      <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </>
  )
}
