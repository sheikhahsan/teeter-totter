import React, { Component } from 'react'
import { connect } from "react-redux";

import { getRandomNumber } from '../../utils/random'
import { FlexContainer, Square, EmptySquare, FlexCol } from './styles'
import { SET_LEFT_TORQUE, SET_LEFT_WEIGHT, GAME_STATUS } from '../../../_store'

class LeftSide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objects: [],
      cols: [
        [], [], [], [], []
      ],
      intervalId: null
    } 
  }

  componentDidMount() { this.addInterval() }

  componentWillUnmount() { this.removeInterval() }

  componentDidUpdate(prevProps) {
    if (prevProps.gameStatus !== this.props.gameStatus) {
      if (this.props.gameStatus === GAME_STATUS.IN_PROGRESS) {
        this.setState({
          objects: [],
          cols: [
            [], [], [], [], []
          ],
          intervalId: null
        })
        this.addInterval()
      } else {
        this.removeInterval()
      }
    }
  }

  addInterval() {
    const intervalId = setInterval(() => this.addNewObject(), 2000)
    this.setState({
      intervalId
    })
  }

  removeInterval() {
    clearInterval(this.state.intervalId)
  }

  getNewObject = () => {
    const { netTorque } = this.props
    const weight = getRandomNumber(10)
    const propsedPosition = Math.ceil(netTorque/weight)
    const position = propsedPosition > 5 ? 5 : (propsedPosition <= 0 ? 1 : propsedPosition)
    console.log(propsedPosition, position)
		return {
			weight,
			position
		}
  }

  addNewObject = () => {
    const newObj = this.getNewObject()
    this.setState({
      objects: [
        ...this.state.objects,
        newObj
      ]
    }, () => {
      this.computeTorque()
    })
    const copy = JSON.parse(JSON.stringify(this.state.cols))
    copy[newObj.position - 1].push(newObj)
    this.setState({
      cols: copy
    })
  }

  computeTorque = () => {
    const { objects } = this.state
    const { setLeftTorque, setLeftWeight } = this.props
    const totalTorque = objects.reduce((sum, { weight, position}) => sum + (weight*position), 0)
    const totalWeight = objects.reduce((sum, { weight, position}) => sum + weight, 0)
    setLeftTorque(totalTorque)
    setLeftWeight(totalWeight)
  }

  render() {
    return (
      <FlexContainer>
        {this.state.cols.map((col, index) => (
          <FlexCol key={index.toString()}>
            {
              !col.length
                ? <EmptySquare />
                : col.map((obj, index2) => (
                  <Square key={index2.toString()}>
                    <span className="text">
                      {obj.weight} kg<br/>
                      {obj.position} m
                    </span>
                  </Square>
              ))
            }
          </FlexCol>
        ))}
      </FlexContainer>
    )
  }
}

const mapStateToProps = ({ reducer }) => {
	return {
    gameStatus: reducer.gameStatus,
    netTorque: reducer.rightTorque - reducer.leftTorque
	}
}

const mapDispatchToProps = dispatch => {
  return {
    setLeftTorque: data => dispatch({
      type: SET_LEFT_TORQUE,
      data
    }),
    setLeftWeight: data => dispatch({
      type: SET_LEFT_WEIGHT,
      data
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSide)
