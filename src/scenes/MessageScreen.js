import React from 'react'
import { connect } from 'react-redux'
import { START_GAME, SET_MESSAGE, GAME_STATUS } from '../_store'

const MessageScreen = ({ gameStatus, startGame, setMessage }) => {

  const onStart = () => {
    startGame()
    setMessage('')
  }

  let btnText = ''

  switch(gameStatus) {
    case GAME_STATUS.NOT_STARTED:
      btnText = 'Start Game'
      break;
    case GAME_STATUS.PAUSED:
      btnText = 'Continue Game'
      break;
    case GAME_STATUS.OVER:
      btnText = 'Restart Game'
      break;
  }

  return (<button type="button" onClick={() => onStart()}>{btnText}</button>)
}

const mapStateToProps = ({ reducer }) => {
	return {
    gameStatus: reducer.gameStatus
	}
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch({
      type: START_GAME
    }),
    setMessage: data => dispatch({
      type: SET_MESSAGE,
      data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)