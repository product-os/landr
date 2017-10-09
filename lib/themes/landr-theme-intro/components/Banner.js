import { Banner } from 'rebass'
import styled from 'styled-components'

export default styled(Banner)`
  background-image: linear-gradient(20deg, #ff5858, #f857a6);
  min-height: ${props => props.maxHeight};
`
