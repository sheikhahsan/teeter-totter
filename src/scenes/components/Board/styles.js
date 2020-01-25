import styled from 'styled-components'

export const Rod = styled.div`
  width: 54rem;
  border-bottom: 3px solid;
  margin-bottom: 50px;
  transform: rotate(${props => props.netTorque}deg);
  margin-bottom: 100px;
`
