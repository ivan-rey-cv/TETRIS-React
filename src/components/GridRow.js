import React from 'react'

import styled from 'styled-components'
const Row = styled.div`
	${props => ({
		//  row-start, column-start, row-end and column-end,
		gridArea: `${props.pos} / 1 / ${props.pos + 1} / -1`
	})};

	display: flex;
	width: 100%;
`
const Item = styled.span`
	height: 100%;
	flex: 1;

	${props => ({
		backgroundColor: `${props.color ? props.color : 'transparent'}`
	})};
`

function GridRow(props) {
	return (
		<Row pos={props.pos}>
			{props.list.map(item => (
				<Item color={item}>{item}</Item>
			))}
		</Row>
	)
}

export default React.memo(GridRow)
