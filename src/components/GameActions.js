import React from 'react'
import ActionsLayout from '../layouts/ActionsLayout'
import ActionDiv from './ActionDiv'

import { ReactComponent as PauseSVG } from '../icons/pause.svg'
import { ReactComponent as RightSVG } from '../icons/arrowRight.svg'
import { ReactComponent as LeftSVG } from '../icons/arrowLeft.svg'
import { ReactComponent as DownSVG } from '../icons/arrowDown.svg'
import { ReactComponent as RotateSVG } from '../icons/rotate.svg'

const actions = [
	{
		name: 'left',
		svg: LeftSVG,
		action: 'handleLeft'
	},
	{
		name: 'down',
		svg: DownSVG,
		action: 'handleDown'
	},
	{
		name: 'rotate',
		svg: RotateSVG,
		action: 'handleRotate',
		uncontinuous: true
	},
	{
		name: 'right',
		svg: RightSVG,
		action: 'handleRight'
	}
]
function GameActions(props) {
	return (
		<ActionsLayout>
			<ActionDiv
				reversed={true}
				SVG={PauseSVG}
				isPaused={props.isPaused}
				value={props.isPaused ? 'unpause' : 'pause'}
				event={props.togglePause}
				uncontinuous={true}
			/>

			{actions.map((action, index) => (
				<ActionDiv
					key={action.name}
					SVG={action.svg}
					isPaused={props.isPaused}
					value={action.name}
					event={props[action.action]}
					uncontinuous={action.uncontinuous}
				/>
			))}
		</ActionsLayout>
	)
}

export default React.memo(GameActions)
