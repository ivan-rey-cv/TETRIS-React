import React from 'react'
import Grid from './Grid'

import styled from 'styled-components'
const Div = styled.article`
	z-index: 10;
	background-color: lightgray;

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
