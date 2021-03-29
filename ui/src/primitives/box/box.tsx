import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  _flexItemStyle,
  _FlexItemStyleProps,
  _responsiveBoxStyle,
  _ResponsiveBoxStyleProps,
  _responsiveGridItemStyle,
  _ResponsiveGridItemStyleProps,
  _responsivePaddingStyle,
  _ResponsivePaddingStyleProps,
  _responsiveMarginStyle,
  _ResponsiveMarginStyleProps,
} from '../../styles'
import {
  ResponsiveBoxProps,
  ResponsiveFlexItemProps,
  ResponsiveGridItemProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
} from '../types'

/**
 * @public
 */
export interface BoxProps
  extends ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<
  _FlexItemStyleProps &
    _ResponsiveBoxStyleProps &
    _ResponsiveGridItemStyleProps &
    _ResponsiveMarginStyleProps &
    _ResponsivePaddingStyleProps
>(
  _flexItemStyle,
  _responsiveBoxStyle,
  _responsiveGridItemStyle,
  _responsiveMarginStyle,
  _responsivePaddingStyle
)

/**
 * @public
 */
export const Box = forwardRef(
  (props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'height'>, ref) => {
    const {
      as: asProp = 'div',
      column,
      columnStart,
      columnEnd,
      display = 'block',
      flex,
      height,
      margin = 0,
      marginX,
      marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      overflow,
      padding = 0,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      row,
      rowStart,
      rowEnd,
      sizing,
      ...restProps
    } = props

    return (
      <Root
        data-ui="Box"
        {...restProps}
        $column={column}
        $columnStart={columnStart}
        $columnEnd={columnEnd}
        $display={display}
        $flex={flex}
        $height={height}
        $margin={margin}
        $marginX={marginX}
        $marginY={marginY}
        $marginTop={marginTop}
        $marginRight={marginRight}
        $marginBottom={marginBottom}
        $marginLeft={marginLeft}
        $overflow={overflow}
        $padding={padding}
        $paddingX={paddingX}
        $paddingY={paddingY}
        $paddingTop={paddingTop}
        $paddingRight={paddingRight}
        $paddingBottom={paddingBottom}
        $paddingLeft={paddingLeft}
        $row={row}
        $rowStart={rowStart}
        $rowEnd={rowEnd}
        $sizing={sizing}
        as={asProp}
        ref={ref}
      >
        {props.children}
      </Root>
    )
  }
)

Box.displayName = 'Box'
