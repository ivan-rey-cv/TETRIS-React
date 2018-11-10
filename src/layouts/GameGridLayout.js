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
	height: 420px;
	width: 315px;

	display: grid;
	grid-template-columns: repeat(15, 20px);
	grid-template-rows: repeat(20, 20px);
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
