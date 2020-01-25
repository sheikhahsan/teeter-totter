import React, { useState } from 'react'
import { connect } from "react-redux";

import Board from './components/Board'
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import { FlexContainer, FlexItem, SimpleFlexItem, FlexColContainer } from './styles'

const Scene = props => {  
  const { rightTorque, rightWeight, leftWeight, leftTorque } = props

	return (
		<FlexColContainer>
			<h5>Teeter Totter</h5>
      <p>Net Toque: {rightTorque - leftTorque}</p>
			<FlexContainer>
				<SimpleFlexItem>
					<h5>Left Side</h5>
					<p>Total weight: {leftWeight}</p>
					<p>Total Torque: {leftTorque}</p>
				</SimpleFlexItem>
				<SimpleFlexItem>
					<h5>Right Side</h5>
					<p>Total weight: {rightWeight}</p>
					<p>Total Torque: {rightTorque}</p>
				</SimpleFlexItem>
			</FlexContainer>
			<FlexContainer className="blocks-area">
				<FlexItem>
					<LeftSide />
				</FlexItem>
				<FlexItem>
					<RightSide />
				</FlexItem>
			</FlexContainer>
			<Board />
			<FlexContainer>
			</FlexContainer>
		</FlexColContainer>
	)
}

const mapStateToProps = ({ reducer }) => {
	return {
    rightTorque: reducer.rightTorque,
    rightWeight: reducer.rightWeight,
    leftTorque: reducer.leftTorque,
    leftWeight: reducer.leftWeight
	}
}
  
export default connect(mapStateToProps)(Scene)
