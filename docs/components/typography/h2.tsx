import {Box, Heading} from '@sanity/ui'
import React, {forwardRef} from 'react'

export const H2 = forwardRef(function H2(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <Box {...restProps} marginTop={[5, 5, 6]} marginBottom={[4, 4, 5]} ref={ref}>
      <Heading as="h2" size={[1, 1, 2, 3]}>
        {children}
      </Heading>
    </Box>
  )
})
