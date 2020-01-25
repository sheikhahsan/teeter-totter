import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import MessageScreen from './MessageScreen'
import Board from './components/Board'
import RightSide from './components/RightSide'
import LeftSide from './components/LeftSide'
import { END_GAME, SET_MESSAGE, GAME_STATUS } from '../_store'
import { FlexContainer, FlexItem, SimpleFlexItem, FlexColContainer } from './styles'

const Scene = props => {  
  const {
    gameStatus,
    message,
    rightTorque,
    rightWeight,
    leftWeight,
    leftTorque,
    netTorque,
    endGame,
    setMessage
  } = props

  useEffect(() => {
    if (netTorque >= 20 || netTorque <= -20) {
      endGame()
      setMessage(`Game Over! Teeter Totter unbalanced by ${netTorque} kgm`)
    }
  }, [netTorque])

	return (
		<FlexColContainer>
			<h1>Teeter Totter</h1>
      <p>{message}</p>
      {gameStatus !== GAME_STATUS.IN_PROGRESS ? <MessageScreen /> : null}
      {gameStatus !== GAME_STATUS.NOT_STARTED ? (
        <>
          <h3>Net Toque: {rightTorque - leftTorque}</h3>
          <FlexContainer>
            <SimpleFlexItem>
              <p>Total weight: {leftWeight}</p>
              <p>Total Torque: {leftTorque}</p>
            </SimpleFlexItem>
            <SimpleFlexItem>
              <p>Total weight: {rightWeight}</p>
              <p>Total Torque: {rightTorque}</p>
            </SimpleFlexItem>
          </FlexContainer>
          <FlexContainer className="blocks-area" netTorque={netTorque}>
            <FlexItem>
              <LeftSide />
            </FlexItem>
            <FlexItem>
              <RightSide />
            </FlexItem>
          </FlexContainer>
          <Board netTorque={netTorque}/>
        </>
        ) : null
      }
      
		</FlexColContainer>
	)
}

const mapStateToProps = ({ reducer }) => {
	return {
    gameStatus: reducer.gameStatus,
    message: reducer.message,
    rightTorque: reducer.rightTorque,
    rightWeight: reducer.rightWeight,
    leftTorque: reducer.leftTorque,
    leftWeight: reducer.leftWeight,
    netTorque: reducer.rightTorque - reducer.leftTorque
	}
}

const mapDispatchToProps = dispatch => {
  return {
    endGame: () => dispatch({
      type: END_GAME,
    }),
    setMessage: data => dispatch({
      type: SET_MESSAGE,
      data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scene)
