import { combineReducers } from "redux"

export const SET_RIGHT_WEIGHT = "SET_RIGHT_WEIGHT"
export const SET_LEFT_WEIGHT = "SET_LEFT_WEIGHT"
export const SET_RIGHT_TORQUE = "SET_RIGHT_TORQUE"
export const SET_LEFT_TORQUE = "SET_LEFT_TORQUE"

const initialState = {
  rightWeight: 0,
  leftWeight: 0,
  rightTorque: 0,
  leftTorque: 0
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
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