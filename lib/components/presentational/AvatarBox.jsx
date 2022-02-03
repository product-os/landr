import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'
import {
  Box
} from 'rendition'

const AvatarBox = styled(Box) `
  width: 380px;
  max-width: 100%;
  box-shadow: 0 10px 0
      ${(props) => {
    return hexToRgba(props.theme.colors.primary.main, 0.1)
  }},
    4px 4px 0 0
      ${(props) => {
    return props.theme.colors.primary.main
  }};
`
export default AvatarBox
