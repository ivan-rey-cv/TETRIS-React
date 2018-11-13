import React from 'react'

import styled from 'styled-components'
const Div = styled.div`
	font-weight: 600;
	display: flex;
	align-items: center;

	.points {
		font-size: 1.25rem;
		margin-right: 0.5rem;
		color: firebrick;
	}

	.display {
		color: #645ea3;
	}
`

function Points(props) {
	return (
		<Div>
			<span className="points">{props.points}</span>
			<span className="display">points</span>
		</Div>
	)
}

export default React.memo(Points)
