import React from 'react'

import styled from 'styled-components'
const Tetromino = styled.span`
	display: flex;
	flex-direction: column;
	margin-left: 0.5rem;
	/* has weird behavior: does not behave as block */
	margin-top: -1rem;

	.row {
		height: 7px;
		width: auto;
	}
`
const Cell = styled.div`
	display: inline-block;
	height: 100%;
	width: 7px;
	border: 0.5px solid lightgray;

	${props => {
		if (props.color) {
			return {
				backgroundColor: props.color
			}
		}
	}};
`
const Wrapper = styled.span`
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	font-weight: 900;
	color: darkgray;
`

function Next(props) {
	console.log(props)
	return (
		<Wrapper>
			<span>NEXT</span>
			<Tetromino>
				{props.tetromino.matrix.map((row, rowIndex) => (
					<span className="row" key={`${row}-${rowIndex}`}>
						{row.map((cell, cellIndex) => (
							<Cell
								color={cell === 1 ? props.tetromino.color : ''}
								key={`cell-${cellIndex}`}
							/>
						))}
					</span>
				))}
			</Tetromino>
		</Wrapper>
	)
}

export default React.memo(Next)
