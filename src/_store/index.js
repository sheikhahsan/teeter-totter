import { combineReducers } from "redux"

// action types
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_RIGHT_WEIGHT = "SET_RIGHT_WEIGHT"
export const SET_LEFT_WEIGHT = "SET_LEFT_WEIGHT"
export const SET_RIGHT_TORQUE = "SET_RIGHT_TORQUE"
export const SET_LEFT_TORQUE = "SET_LEFT_TORQUE"

// constant
export const GAME_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  PAUSED: 2,
  OVER: 3
}

const initialState = {
  gameStatus: GAME_STATUS.NOT_STARTED,
  message: '',
  rightWeight: 0,
  leftWeight: 0,
  rightTorque: 0,
  leftTorque: 0
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameStatus: GAME_STATUS.IN_PROGRESS,
        message: '',
        rightTorque: 0,
        rightWeight: 0,
        leftTorque: 0,
        leftWeight: 0
      }
    case END_GAME:
      return {
        ...state,
        gameStatus: GAME_STATUS.OVER
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.data
      }
    case SET_RIGHT_WEIGHT:
      return {
        ...state,
        rightWeight: action.data
      }
    case SET_LEFT_WEIGHT:
      return {
        ...state,
        leftWeight: action.data
      }
    case SET_RIGHT_TORQUE:
      return {
        ...state,
        rightTorque: action.data
      }
    case SET_LEFT_TORQUE:
      return {
        ...state,
        leftTorque: action.data
      }
    default:
      return state
  }
}

export default combineReducers({
  reducer
})