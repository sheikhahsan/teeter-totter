import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  width: 50rem;
`
export const FlexItem = styled.div`
  width: 50%;
  &:first-child {
    border-right: 1px solid;
  }
  &:last-child {
    border-left: 1px solid;
  }
`
export const SimpleFlexItem = styled.div`
  width: 50%;
`
