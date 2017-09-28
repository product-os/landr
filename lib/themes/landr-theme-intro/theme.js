import { colors } from 'rebass';
colors.base = '#FF5858';
colors.gray1 = '#fafafa';
colors.blue = '#FF5858'

const theme = {
  breakpoints: [32, 48, 64, 80],
  space: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  weights: [400, 700],
  colors: colors,
  radius: 4,
  font: '-apple-system, BlinkMacSystemFont, sans-serif',
  monospace: '"SF Mono", "Roboto Mono", Menlo, monospace'
};

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
  color: ${theme.colors.black};
  text-decoration: none;
  cursor: pointer;
}
blockquote {
  font-style: italic;
  padding: 20px;
  > p {
    box-shadow: inset 0 -5px 0px 0px ${theme.colors.base};
  }
}
code {
  background: ${theme.colors.gray2};
  padding: 5px;
}
pre > code {
  background: none;
}
`;
export default theme;
export { globalStyles };
