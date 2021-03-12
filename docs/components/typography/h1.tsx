import {Box, Heading} from '@sanity/ui'
import React, {forwardRef} from 'react'

export const H1 = forwardRef(function H1(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <Box {...restProps} ref={ref}>
      <Heading as="h1" size={[2, 2, 3, 4]}>
        {children}
      </Heading>
    </Box>
  )
})
