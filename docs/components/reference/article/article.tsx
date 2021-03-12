import {Badge, Box, Card, Code, Container, Heading, Inline, Stack} from '@sanity/ui'
import React from 'react'
import {Comment} from '../comment'
import {ReferenceClassArticle} from './classArticle'
import {ReferenceFunctionArticle} from './functionArticle'
import {ReferenceInterfaceArticle} from './interfaceArticle'
import {ReferenceTypeAliasArticle} from './typeAliasArticle'
import {ReferenceVariableArticle} from './variableArticle'

export function ReferenceArticle(props: any) {
  return (
    <article>
      <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
        <Container width={1}>
          <ReferenceArticleContent data={props.data} />
        </Container>
      </Box>
    </article>
  )
}

function ReferenceArticleContent(props: any) {
  const {data} = props

  if (data._type === 'api.class') {
    return <ReferenceClassArticle data={data} />
  }

  if (data._type === 'api.function') {
    return <ReferenceFunctionArticle data={data} />
  }

  if (data._type === 'api.interface') {
    return <ReferenceInterfaceArticle data={data} />
  }

  if (data._type === 'api.typeAlias') {
    return <ReferenceTypeAliasArticle data={data} />
  }

  if (data._type === 'api.variable') {
    return <ReferenceVariableArticle data={data} />
  }

  return (
    <>
      <Stack space={4}>
        <Heading as="h1" size={[2, 2, 3, 4]}>
          {data.name}
        </Heading>

        <Inline space={1}>
          {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
        </Inline>
      </Stack>

      {data.comment && <Comment comment={data.comment} />}

      <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data, null, 2)}</Code>
      </Card>
    </>
  )
}
