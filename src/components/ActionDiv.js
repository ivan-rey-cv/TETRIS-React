import React, { useState, useCallback } from 'react'

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

function ActionDiv(props) {
	const { SVG, value } = props
	const [timer, setTimer] = useState(null)
	const [delay, setDelay] = useState(0)
	let handeMouseDown, handleMouseExit

	if (props.uncontinuous) {
		// for rotate and pause/unpause
		handeMouseDown = props.event
		handleMouseExit = useCallback(_ => {
			/* do nothing*/
		})
	} else {
		handeMouseDown = useCallback(e => {
			let newTimer = setInterval(() => {
				props.event(e)
			}, 150)
			setTimer(newTimer)
		})

		handleMouseExit = useCallback(e => {
			clearInterval(timer)
			setDelay(0)
		})
	}

	return (
		<Div
			onMouseDown={handeMouseDown}
			onMouseUp={handleMouseExit}
			onMouseLeave={handleMouseExit}
			onMouseOut={handleMouseExit}
			className={`${props.reversed ? 'reversed' : ''} ${
				props.isPaused ? 'paused' : ''
			}`}
		>
			<SVG />
			<span>{value}</span>
		</Div>
	)
}

export default React.memo(ActionDiv)
