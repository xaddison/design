import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
`

export function SrOnly({
  as,
  children,
}: {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  children?: React.ReactNode
}): React.ReactElement {
  return (
    <Root aria-hidden as={as} data-ui="SrOnly">
      {children}
    </Root>
  )
}
