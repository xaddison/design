import {CSSObject} from 'styled-components'
import {EMPTY_ARRAY} from '../constants'
import {Theme} from '../theme'

export function fillCSSObject(propKeys: string[], value: any): CSSObject {
  return propKeys.reduce((obj: CSSObject, propKey) => {
    obj[propKey] = value

    return obj
  }, {})
}

export function rem(pixelValue: number): string | 0 {
  if (pixelValue === 0) return 0

  return `${pixelValue / 16}rem`
}

export function responsive<T>(
  media: number[],
  values: T[],
  callback: (value: T, index: number, array: T[]) => CSSObject
): CSSObject[] {
  const statements = values.map(callback)

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement

    return {[`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement}
  })
}

export function getResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  if (val === undefined) return defaultVal || EMPTY_ARRAY

  return Array.isArray(val) ? val : [val]
}

export function getResponsiveSpace(
  theme: Theme,
  props: string[],
  spaceIndexes: number[] = EMPTY_ARRAY
) {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  if (spaceIndexes.length === 0) {
    return null
  }

  return responsive(theme.sanity.media, spaceIndexes, (spaceIndex) =>
    fillCSSObject(props, rem(theme.sanity.space[spaceIndex]))
  )
}
