import React, { Fragment } from 'react'
import GridRow from './GridRow'

function GameGrid(props) {
	return (
		<Fragment>
			{props.grid.map((row, index) => (
				<GridRow list={row} pos={index + 1} />
			))}
		</Fragment>
	)
}

export default React.memo(GameGrid)
