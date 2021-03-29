import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './fonts'
import {ThemeInput} from './input'
import {ThemeShadow} from './shadow'

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseTheme<Styles extends {} = {}> {
  avatar: ThemeAvatar
  button: {
    textWeight: ThemeFontWeightKey
  }
  color: ThemeColorSchemes
  container: number[]
  focusRing: {
    offset: number
    width: number
  }
  fonts: ThemeFonts
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput

  /**
   * @beta
   */
  __unstable_styles?: Styles
}
