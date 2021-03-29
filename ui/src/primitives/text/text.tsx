import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  _ResponsiveFontStyleProps,
  _responsiveTextAlignStyle,
  _responsiveTextFont,
} from '../../styles'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

const Root = styled.div<_ResponsiveFontStyleProps>(
  _responsiveTextFont,
  _responsiveTextAlignStyle,
  textBaseStyle
)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

/**
 * @public
 */
export const Text = forwardRef(
  (props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {
      accent = false,
      align,
      children: childrenProp,
      muted = false,
      size = 2,
      textOverflow,
      weight,
      ...restProps
    } = props

    let children = childrenProp

    if (textOverflow === 'ellipsis') {
      children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
    }

    return (
      <Root
        data-ui="Text"
        {...restProps}
        $accent={accent}
        $align={align}
        $muted={muted}
        ref={ref}
        $size={size}
        $weight={weight}
      >
        {children}
      </Root>
    )
  }
)

Text.displayName = 'Text'
