import React from 'react'
import Points from './Points'

import styled from 'styled-components'
const Overlay = styled.section`
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;

	display: flex;
	justify-content: center;
	align-items: center;
	background-color: hsla(33, 100%, 50%, 0.4);
`
const ModalWrapper = styled.div`
	width: 100%;
	max-width: 500px;
	padding-bottom: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Display = styled.div`
	font-weight: 600;
	padding: 0.5rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 2rem;
	}

	article {
		font-size: 200%;
		margin-top: 1rem;
		margin-bottom: 2rem;

		> ul {
			font-size: 0.9rem;
			text-align: center;
		}
	}
`
const ButtonDiv = styled.div`
	margin-top: 1rem;
	padding: 0.5rem 1.5rem;
	border-radius: 4px;
	font-size: 1.25rem;
	font-weight: 900;
	letter-spacing: 1px;
	color: whitesmoke;
	background: linear-gradient(to right, purple, teal);
	cursor: pointer;

	:hover {
		box-shadow: 2px 2px 8px black;
	}
	:active {
		transform: scale(0.95);
	}
`

function Modal(props) {
	return (
		<Overlay>
			<ModalWrapper>
				<Display>
					<h1>REACT TETRIS</h1>
					<article>
						{props.isGameOver ? (
							<Points points={props.points} />
						) : (
							<ul>
								<li>
									<h3>Keyboard actions:</h3>
								</li>
								<li> p - toggle pause </li>
								<li>left-arrow - turn left </li>
								<li>right-arrow - turn right </li>
								<li>down-arrow - down </li>
								<li>up-arrow - rotate </li>
							</ul>
						)}
					</article>
				</Display>
				<ButtonDiv onClick={props.handleStartGame}>
					{props.isGameOver ? 'New Game' : 'Start Game'}
				</ButtonDiv>
			</ModalWrapper>
		</Overlay>
	)
}

export default React.memo(Modal)
