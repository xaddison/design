import {Badge, Card, Code, Inline, Label, Stack} from '@sanity/ui'
import React from 'react'
import {Comment} from '../comment'
import {PropsType} from '../propsType'
import {prettify} from './helpers'
import {H1, H2} from '$components/typography'

export function ReferenceVariableArticle(props: {data: any}) {
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

      {data.propsType && (
        <>
          <H2>Props</H2>
          <PropsType data={data.propsType} />
        </>
      )}

      {!data.propsType && data.type && (
        <Stack marginY={[4, 4, 5]} space={3}>
          <Label>Type</Label>

          <Card overflow="auto" padding={4} radius={2} shadow={1}>
            <Code language="typescript">
              {prettify(`const ${data.name}: ` + data.type.map((t: any) => t.text).join(''))}
            </Code>
          </Card>
        </Stack>
      )}

      {/* <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card> */}
    </>
  )
}
