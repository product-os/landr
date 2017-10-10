import { lighten, darken, blacken, fade } from 'resin-components/dist/utils'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import isObject from 'lodash/isObject'

const primary = '#2297DE'
const secondary = '#FFC523'
const tertiary = '#4D5057'
const quartenary = '#EBEFF4'

const danger = '#FF423D'
const warning = '#FCA321'
const success = '#76C950'
const info = '#1496E1'
const text = '#3c3e42'
const gray = {
  light: '#f4f4f4',
  main: '#c6c8c9',
  dark: '#292b2c'
}

const createShades = color => {
  if (isObject(color)) return color
  return {
    main: color,
    light: lighten(color),
    dark: darken(color)
  }
}

const defaultColors = {
  primary,
  secondary,
  tertiary,
  quartenary,
  danger,
  warning,
  success,
  info,
  text,
  gray
}

const createColors = colors => {
  return reduce(
    colors,
    (acc, val, key) => {
      acc[key] = createShades(val)
      return acc
    },
    {}
  )
}

const defaultControlHeight = 36
const emphasizedControlHeight = 45

export const breakpoints = [32, 48, 64, 80]

export const space = [
  0,
  4,
  8,
  16,
  defaultControlHeight,
  emphasizedControlHeight,
  128
]

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96]

export const weights = [400, 700]

export const radius = 4
export const font = `Roboto, Arial, sans-serif`
export const monospace = `'Ubuntu Mono', 'Courier New', monospace`

const theme = userTheme => {
  return {
    colors: createColors({
      ...defaultColors,
      ...get(userTheme, 'colors')
    }),
    breakpoints,
    space,
    fontSizes,
    weights,
    font,
    monospace,
    radius
  }
}

const globalStyles = theme => `
* { box-sizing: border-box; }
body { margin: 0; }
p {
  line-height: 1.5;
}
ul {
  list-style: none;
  margin-bottom: ${theme.space[4]}px;
  li {
    margin-bottom: ${theme.space[2]}px;
  }
}
img { max-width: 100%; }
a {
  color: ${theme.colors.primary.main};
  text-decoration: none;
  cursor: pointer;
}
blockquote {
  font-style: italic;
  padding: 20px;
  > p {
    box-shadow: inset 0 -5px 0px 0px ${theme.colors.primary.main};
  }
}
code {
  background: ${theme.colors.gray.light};
  padding: 5px;
}
pre > code {
  background: none;
}
`

export default theme
export { globalStyles }
