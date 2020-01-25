import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  width: 54rem;
  &.blocks-area {
    flex-grow: 1;
  }
`
export const FlexItem = styled.div`
  width: 50%;
  position: relative;
  &:first-child {
    border-right: 1px solid;
    padding-right: 2px;
  }
  &:last-child {
    border-left: 1px solid;
    padding-left: 2px;
  }
`
export const SimpleFlexItem = styled.div`
  width: 50%;
`

export const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
