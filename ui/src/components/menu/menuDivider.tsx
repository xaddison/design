import React, {forwardRef} from 'react'
import styled from 'styled-components'

/**
 * @public
 */
export interface MenuDividerProps {}

const Root = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`

/**
 * @public
 */
export const MenuDivider = forwardRef(function MenuDivider(
  props: MenuDividerProps & Omit<React.HTMLProps<HTMLHRElement>, 'as'>,
  ref: React.Ref<HTMLHRElement>
) {
  return <Root {...props} ref={ref} />
})
