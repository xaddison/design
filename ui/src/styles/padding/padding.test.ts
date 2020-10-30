import {studioTheme as theme} from '../../theme'
import {padding} from './padding'

describe('styles/padding', () => {
  it('should', () => {
    const styles = padding({padding: 0, theme})

    expect(styles).toEqual([[{padding: 0}]])
  })

  it('should', () => {
    const styles = padding({padding: [0, 1, 2], theme})

    expect(styles).toEqual([
      [
        {
          padding: 0,
        },
        {
          '@media(min-width:320px)': {padding: '0.25rem'},
        },
        {
          '@media(min-width:640px)': {padding: '0.5rem'},
        },
      ],
    ])
  })
})
