import styled from 'styled-components'

export const Square = styled.div`
  height: 3rem;
  width: 5rem;
  border: 1px solid;
  position: relative;
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
  }
`

export const EmptySquare = styled.div`
  width: 5rem;
`

export const FlexContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  flex-direction: row-reverse;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column-reverse;
`
