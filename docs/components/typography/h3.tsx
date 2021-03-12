import {Box, Heading} from '@sanity/ui'
import React, {forwardRef} from 'react'

export const H3 = forwardRef(function H3(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <Box {...restProps} marginTop={[5, 5, 6]} marginBottom={[4, 4, 5]} ref={ref}>
      <Heading as="h3" size={[0, 0, 1, 2]}>
        {children}
      </Heading>
    </Box>
  )
})
