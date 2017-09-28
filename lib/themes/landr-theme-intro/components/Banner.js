import { Banner } from 'rebass'
import styled from 'styled-components'

export default styled(Banner)`
  background-image: linear-gradient(20deg,#FF5858,#F857A6);
  min-height: ${(props) => props.maxHeight}
`
