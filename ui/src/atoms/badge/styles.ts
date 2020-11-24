import {css} from 'styled-components'
import {ThemeColorSchemeKey, Theme} from '../../theme'
import {BadgeMode, BadgeTone} from './types'

export function badge({
  mode,
  scheme,
  theme,
  tone,
}: {
  mode: BadgeMode
  scheme: ThemeColorSchemeKey
  theme: Theme
  tone: BadgeTone
}) {
  const _color = theme.color[scheme].badge
  const _tone = _color.tones[tone] || _color.tones.default
  const _mode = _tone.modes[mode] || _tone.modes.default

  return css`
    background-color: ${_mode.bg};
    color: ${_mode.fg};
    box-shadow: inset 0 0 0 1px ${_mode.border};

    &:not([hidden]) {
      display: inline-block;
    }
  `
}
