import React from 'react'
import GameGridLayout from '../layouts/GameGridLayout'
import GridRow from './GridRow'

function GameGrid(props) {
	return (
		<GameGridLayout>
			{props.grid.map((row, index) => (
				<GridRow list={row} pos={index + 1} />
			))}
		</GameGridLayout>
	)
}

export default React.memo(GameGrid)
