import styled from 'styled-components'

const Mask = styled.div`
  position: fixed;
  height: 100%;
  width: 70%;
  z-index: 5;
  transform: translateY(100%);
  ${props => props.open && `transform: translateY(0%);`};
`

export default Mask
