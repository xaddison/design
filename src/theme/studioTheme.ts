import {color} from '@sanity/color'
import {rgba} from 'polished'
import {Theme} from './types'

export const studioTheme: Theme = {
  color: {
    button: {
      tones: {
        default: {
          enabled: {
            bg: color.gray['500'].hex,
            fg: color.white.hex,
          },
          hovered: {
            bg: color.gray['600'].hex,
            fg: color.white.hex,
          },
        },
        brand: {
          enabled: {
            bg: color.blue['500'].hex,
            fg: color.white.hex,
          },
          hovered: {
            bg: color.blue['600'].hex,
            fg: color.white.hex,
          },
        },
      },
    },
    card: {
      tones: {
        default: {
          bg: color.white.hex,
          fg: color.black.hex,
          hairline: {
            soft: color.gray['100'].hex,
            hard: color.gray['200'].hex,
          },
          focusRing: color.blue['500'].hex,
          link: color.blue['600'].hex,
          shadow: {
            outline: rgba(color.gray['500'].hex, 0.2),
            umbra: rgba(color.gray['500'].hex, 0.2),
            penumbra: rgba(color.gray['500'].hex, 0.14),
            ambient: rgba(color.gray['500'].hex, 0.12),
          },
        },
        transparent: {
          bg: color.gray['100'].hex,
          fg: color.black.hex,
          hairline: {
            soft: color.gray['200'].hex,
            hard: color.gray['400'].hex,
          },
          focusRing: color.blue['500'].hex,
          link: color.blue['800'].hex,
          shadow: {
            outline: rgba(color.gray['500'].hex, 0.2),
            umbra: rgba(color.gray['500'].hex, 0.2),
            penumbra: rgba(color.gray['500'].hex, 0.14),
            ambient: rgba(color.gray['500'].hex, 0.12),
          },
        },
        contrast: {
          bg: color.black.hex,
          fg: color.white.hex,
          hairline: {
            soft: color.gray['900'].hex,
            hard: color.gray['800'].hex,
          },
          focusRing: color.blue['500'].hex,
          link: color.blue['300'].hex,
          shadow: {
            outline: rgba(color.gray['500'].hex, 0.2),
            umbra: rgba(color.gray['500'].hex, 0.2),
            penumbra: rgba(color.gray['500'].hex, 0.14),
            ambient: rgba(color.gray['500'].hex, 0.12),
          },
        },
      },
    },
  },
  container: [320, 640, 960, 1280, 1600, 1920],
  fonts: {
    code: {
      family: '-apple-system-ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 13,
          lineHeight: 17,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 19,
          lineHeight: 25,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 22,
          lineHeight: 29,
          letterSpacing: 0,
        },
      ],
    },
    heading: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      weight: 600,
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 21,
          lineHeight: 27,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 27,
          lineHeight: 33,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 11,
          descenderHeight: 11,
          fontSize: 33,
          lineHeight: 45,
          letterSpacing: 0,
        },
    },
    label: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [],
    },
    text: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 13,
          lineHeight: 17,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 19,
          lineHeight: 25,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 22,
          lineHeight: 29,
          letterSpacing: 0,
        },
      ],
    },
  },
  media: [320, 640, 960, 1280, 1600, 1920],
  radius: [0, 1, 3, 6, 9, 12, 21],
  shadows: [
    null,
    // 1
    {umbra: [0, 2, 1, -1], penumbra: [0, 1, 1, 0], ambient: [0, 1, 3, 0]},
    // 6
    {umbra: [0, 3, 5, -1], penumbra: [0, 6, 10, 0], ambient: [0, 1, 18, 0]},
    // 12
    {umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]},
    // 18
    {umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]},
    // 24
    {umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]},
  ],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
}
