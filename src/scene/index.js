import React, { useState } from 'react'
import { connect } from "react-redux";

import Board from './components/Board'
import RightSide from './RightSide'
import { getRandomNumber } from './utils/random'
import { FlexContainer, FlexItem, SimpleFlexItem } from './styles'

const Scene = props => {
	const [leftSide, addItemOnLeft] = useState([])

	const getNewObject = () => {
		const weight = getRandomNumber(10)
		const position = getRandomNumber(5)
		return {
			weight,
			position
		}
	}

	const onAddLeft = () => {
		const obj = getNewObject()
		addItemOnLeft([
			...leftSide,
			obj
		])
	}

	const getExpression = arr => {
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

	const getTorque = arr => arr.reduce((sum, { weight, position}) => sum + (weight*position), 0)

  const leftTorque = getTorque(leftSide)
  
  const { rightTorque, rightWeight } = props

	return (
		<div>
			<h5>Scene Component</h5>
			<FlexContainer>
				<SimpleFlexItem>
					<h5>Left Side</h5>
				</SimpleFlexItem>
				<SimpleFlexItem>
					<h5>Right Side</h5>
          <p>Total weight: {rightWeight}</p>
          <p>Total Torque: {rightTorque}</p>
				</SimpleFlexItem>
			</FlexContainer>
			<FlexContainer>
				<FlexItem>
					{getExpression(leftSide)}
					<br /> =
					{leftTorque}
				</FlexItem>
				<FlexItem>
					<RightSide />
				</FlexItem>
			</FlexContainer>
			<Board />
			<FlexContainer>
				<SimpleFlexItem>
					<button type="button" onClick={onAddLeft}>Add on Left</button>
				</SimpleFlexItem>
			</FlexContainer>
		</div>
	)
}

const mapStateToProps = ({ reducer }) => {
	return {
    rightTorque: reducer.rightTorque,
    rightWeight: reducer.rightWeight
	}
}
  
export default connect(mapStateToProps)(Scene)
