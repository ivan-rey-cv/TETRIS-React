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

	return (
		<Div
			// remove long press implementation
			// TODO: working long press event
			onClick={props.event}
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
