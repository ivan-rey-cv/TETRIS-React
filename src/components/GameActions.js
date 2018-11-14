import React from 'react'
import ActionsLayout from '../layouts/ActionsLayout'

import { ReactComponent as PauseSVG } from '../icons/pause.svg'
import { ReactComponent as RightSVG } from '../icons/arrowRight.svg'
import { ReactComponent as LeftSVG } from '../icons/arrowLeft.svg'
import { ReactComponent as DownSVG } from '../icons/arrowDown.svg'
import { ReactComponent as RotateSVG } from '../icons/rotate.svg'

import styled from 'styled-components'
const Div = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 1px;
	padding: 0.5rem;
	height: 4rem;
	width: 4rem;
	background-color: whitesmoke;
	cursor: pointer;
	user-select: none;

	svg {
		height: 1.25rem;
		width: 1.3rem;
	}

	span {
		background-color: none;
		color: #606060;
	}

	&:not(.paused) {
		:hover {
			background-color: lightblue;
		}
		:active {
			transform: scale(0.95);
		}

		svg {
			fill: purple;
		}
	}

	&.paused {
		svg {
			fill: #bca2bc;
		}
	}

	&.reversed {
		svg {
			fill: #bca2bc;
		}
		:hover {
			background-color: lightblue;
		}
		:active {
			transform: scale(0.95);
		}

		&.paused {
			svg {
				fill: purple;
			}
		}
	}
`

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
		action: 'handleRotate'
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
			<Div
				onClick={props.togglePause}
				className={`${props.isPaused ? 'paused' : ''} reversed`}
			>
				<PauseSVG />
				<span>{props.isPaused ? 'unpause' : 'pause'}</span>
			</Div>
			{actions.map((action, index) => (
				<Div
					key={action.name}
					onClick={props[action.action]}
					className={props.isPaused ? 'paused' : ''}
				>
					{<action.svg />}
					<span>{action.name}</span>
				</Div>
			))}
		</ActionsLayout>
	)
}

export default React.memo(GameActions)
