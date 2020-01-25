import React, { Component } from 'react'
import { connect } from "react-redux";

import { getRandomNumber } from '../utils/random'
import { FlexContainer, Square, EmptySquare, FlexCol } from './styles'
import { SET_RIGHT_TORQUE, SET_RIGHT_WEIGHT } from '../../_store'

class RightSide extends Component {
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

  componentDidMount() {
    const intervalId = setInterval(() => this.addNewObject(), 2000)
    this.setState({
      intervalId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  getNewObject = () => {
		const weight = getRandomNumber(10)
		const position = getRandomNumber(5)
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
    const { setRightTorque, setRightWeight } = this.props
    const totalTorque = objects.reduce((sum, { weight, position}) => sum + (weight*position), 0)
    const totalWeight = objects.reduce((sum, { weight, position}) => sum + weight, 0)
    setRightTorque(totalTorque)
    setRightWeight(totalWeight)
  }

  getExpression = arr => {
		const expression = arr.map((obj, index) => (
			<span key={index.toString()}>
				<span>({obj.weight}kg x </span>
				<span>{obj.position}m) + </span>
			</span>
		))
		return (<span>
			{expression}
		</span>)
	}

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRightTorque: data => dispatch({
      type: SET_RIGHT_TORQUE,
      data
    }),
    setRightWeight: data => dispatch({
      type: SET_RIGHT_WEIGHT,
      data
    })
  }
}


export default connect(
  null,
  mapDispatchToProps
)(RightSide)
