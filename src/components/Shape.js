import React from 'react'
import Grid from './Grid'

import styled from 'styled-components'
const Div = styled.article`
	z-index: 10;
	height: 100%;
	width: 100%;
	background-color: rgba(165, 165, 165, 0.5);

	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);

	${props => ({
		gridColumn: `${props.pos.x} / span 3`,
		gridRow: `${props.pos.y} / span 3`
	})};
`

function Shape(props) {
	return (
		<Div pos={props.pos}>
			<Grid grid={props.shape} />
		</Div>
	)
}

export default React.memo(Shape)
