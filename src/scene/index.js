import React, { useState } from 'react'

import Board from './components/Board'
import { getRandomNumber } from './utils/random'
import { FlexContainer, FlexItem, SimpleFlexItem } from './styles'

const Scene = () => {
	const [rightSide, addItemOnRight] = useState([])
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

	const onAddRight = () => {
		const obj = getNewObject()
		addItemOnRight([
			...rightSide,
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
	const rightTorque = getTorque(rightSide)

	return (
		<div>
			<h5>Scene Component</h5>
			<FlexContainer>
				<SimpleFlexItem>
					<h5>Left Side</h5>
				</SimpleFlexItem>
				<SimpleFlexItem>
					<h5>Right Side</h5>
				</SimpleFlexItem>
			</FlexContainer>
			<FlexContainer>
				<FlexItem>
					{getExpression(leftSide)}
					<br /> =
					{leftTorque}
				</FlexItem>
				<FlexItem>
					{getExpression(rightSide)}
					<br /> =
					{rightTorque}
				</FlexItem>
			</FlexContainer>
			<Board />
			<div>
				Net Torque: {leftTorque - rightTorque}
			</div>
			<FlexContainer>
				<SimpleFlexItem>
					<button type="button" onClick={onAddLeft}>Add on Left</button>
				</SimpleFlexItem>
				<SimpleFlexItem>
					<button type="button" onClick={onAddRight}>Add on Right</button>
				</SimpleFlexItem>
			</FlexContainer>
		</div>
	)
}

export default Scene
