import { lighten, darken, blacken, fade } from 'resin-components/dist/utils'

const primary = '#2297DE'
const secondary = '#FFC523'
const tertiary = '#4D5057'
const quartenary = '#EBEFF4'

const danger = '#FF423D'
const warning = '#FCA321'
const success = '#76C950'
const info = '#1496E1'

const colors = {
  primary: {
    main: primary,
    light: lighten(primary),
    dark: darken(primary)
  },
  secondary: {
    main: secondary,
    light: lighten(secondary),
    dark: darken(secondary)
  },
  tertiary: {
    main: tertiary,
    light: lighten(tertiary),
    dark: darken(tertiary)
  },
  quartenary: {
    main: quartenary,
    light: lighten(quartenary),
    // Can't quite replicate this programatically :(
    dark: '#d3d7dc'
  },

  danger: {
    main: danger,
    light: fade(danger),
    dark: blacken(danger)
  },
  warning: {
    main: warning,
    light: fade(warning),
    dark: blacken(warning)
  },
  success: {
    main: success,
    light: fade(success),
    dark: blacken(success)
  },
  info: {
    main: info,
    light: fade(info),
    dark: blacken(info)
  },

  text: {
    main: '#3c3e42',
    light: '#8f9297'
  },

  statusIdle: {
    main: '#89c683'
  },
  statusConfiguring: {
    main: '#ffb25e'
  },
  statusUpdating: {
    main: '#7ccdfd'
  },
  statusPostProvisioning: {
    main: '#aa96d5'
  },
  statusOffline: {
    main: '#fd7c7c'
  },

  gray: {
    light: '#f4f4f4',
    main: '#c6c8c9',
    dark: '#292b2c'
  }
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

const theme = {
  breakpoints,
  space,
  fontSizes,
  weights,
  font,
  monospace,
  colors,
  radius
}

const globalStyles = `
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
  color: ${theme.colors.text.main};
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
