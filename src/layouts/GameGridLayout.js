import React from 'react'

import styled from 'styled-components'
const Layout = styled.section`
	padding: 0.25rem;
	display: flex;
	justify-content: center;
	align-items: center;

	flex: 1;
`
const Grid = styled.div`
	height: 421px;
	width: 316px;

	display: grid;
	grid-template-columns: repeat(15, 21px);
	grid-template-rows: repeat(20, 21px);
	border: 1px solid lightgray;

	background: repeating-linear-gradient(
			to right,
			transparent,
			transparent 20px,
			lightgray 20px,
			lightgray 21px
		),
		repeating-linear-gradient(
			to bottom,
			transparent,
			transparent 20px,
			lightgray 20px,
			lightgray 21px
		);
`

function GameGridLayout(props) {
	return (
		<Layout>
			<Grid>{props.children}</Grid>
		</Layout>
	)
}

export default React.memo(GameGridLayout)
