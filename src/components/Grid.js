import React, { Fragment } from 'react'
import GridRow from './GridRow'

function Grid(props) {
	console.log({ props })

	return (
		<Fragment>
			{props.grid.map((row, index) => (
				<GridRow list={row} pos={index + 1} />
			))}
		</Fragment>
	)
}

export default React.memo(Grid)
