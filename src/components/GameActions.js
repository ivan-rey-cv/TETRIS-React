import React from 'react'
import ActionsLayout from '../layouts/ActionsLayout'

import { ReactComponent as rightSVG } from '../icons/arrowRight.svg'
import { ReactComponent as leftSVG } from '../icons/arrowLeft.svg'
import { ReactComponent as downSVG } from '../icons/arrowDown.svg'
import { ReactComponent as rotateSVG } from '../icons/rotate.svg'

import styled from 'styled-components'
const Div = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 1px;
	padding: 0.25rem;
	height: 3rem;
	width: 3.5rem;
	background-color: whitesmoke;
	cursor: pointer;
	user-select: none;

	:hover {
		background-color: lightblue;
	}
	:active {
		transform: scale(0.95);
	}

	svg {
		fill: purple;
		height: 1.25rem;
		width: 1.3rem;
	}

	span {
		background-color: none;
		color: #606060;
	}
`

const actions = [
	{
		name: 'left',
		svg: leftSVG,
		action: 'handleLeft'
	},
	{
		name: 'down',
		svg: downSVG,
		action: 'handleDown'
	},
	{
		name: 'right',
		svg: rightSVG,
		action: 'handleRight'
	},
	{
		name: 'rotate',
		svg: rotateSVG,
		action: 'handleRotate'
	}
]
function GameActions(props) {
	return (
		<ActionsLayout>
			{actions.map((action, index) => (
				<Div key={action.name} onClick={props[action.action]}>
					{<action.svg />}
					<span>{action.name}</span>
				</Div>
			))}
		</ActionsLayout>
	)
}

export default React.memo(GameActions)
