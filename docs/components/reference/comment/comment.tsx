import {Box} from '@sanity/ui'
import React, {Fragment} from 'react'
import {CommentContent} from './content'
import {H4} from '$components/typography'

export function Comment(props: any) {
  const {comment} = props

  return (
    <>
      {comment.summary && (
        <>
          <CommentContent blocks={comment.summary} />
          {comment.remarks?.content && <CommentContent blocks={comment.remarks?.content} />}
        </>
      )}

      {comment.exampleBlocks &&
        comment.exampleBlocks.map((exampleBlock: any, idx: number) => (
          <Fragment key={exampleBlock._key}>
            <Box marginTop={[5, 5, 6]} marginBottom={[4, 4, 5]}>
              <H4>Example {idx + 1}</H4>
            </Box>

            <CommentContent blocks={exampleBlock.content} />
          </Fragment>
        ))}

      {/* <Code language="json">{JSON.stringify(comment, null, 2)}</Code> */}
    </>
  )
}
