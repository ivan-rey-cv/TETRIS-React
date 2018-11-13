import React, { useReducer, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import GameGridLayout from './layouts/CanvasLayout'
import GameActions from './components/GameActions'
import Modal from './components/Modal'
import Points from './components/Points'
import Next from './components/Next'

import gameReducer from './gameReducer'
import setMatrix from './utils/setMatrix'
import { SQ, COLS, ROWS } from './utils/variables'
import randomTetromino from './utils/randomTetromino'
import randomNumber from './utils/randomNumber'

const defaultState = {
	isGameOver: false,
	inGame: false,
	points: 0,
	ctx: null,
	pos_x: 2 + randomNumber(0, COLS / 2),
	pos_y: -1,
	board: setMatrix(ROWS, COLS),
	nextTetromino: randomTetromino(),
	currentTetromino: randomTetromino()
}

function App(props) {
	let canvas = useRef(null)
	const [store, dispatch] = useReducer(gameReducer, defaultState)

	useEffect(
		e => {
			if (canvas) {
				if (store.ctx) {
					dispatch({ type: 'DRAW_BOARD' })
				} else {
					let ctx = canvas.getContext('2d')
					dispatch({ type: 'INIT_CTX', ctx })
					dispatch({ type: 'DRAW_BOARD' })
				}
			}
		},
		[store.board]
	)

	useEffect(e => {
		if (store.ctx && store.inGame) {
			let delay = 600
			let timer = setInterval(() => {
				dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
			}, delay)
			return () => {
				clearTimeout(timer)
			}
		}
	})

	const handleArrowkeys = useCallback(e => {
		// todo: handle arrow keys
	})
	const handleStartGame = useCallback(e => {
		dispatch({ type: 'START_GAME' })
	})

	const handleRotate = useCallback(e => {
		dispatch({ type: 'ROTATE' })
	})
	const handleLeft = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: -1, newPos_y: 0 })
	})
	const handleRight = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 1, newPos_y: 0 })
	})
	const handleDown = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
	})

	return (
		<MainLayout onKeyPress={handleArrowkeys}>
			<HeaderLayout>
				<Next tetromino={store.nextTetromino} />
				<Points points={store.points} />
			</HeaderLayout>

			<GameGridLayout>
				<canvas
					ref={e => (canvas = e)}
					height={ROWS * SQ}
					width={COLS * SQ}
				/>
			</GameGridLayout>

			<GameActions
				handleLeft={handleLeft}
				handleRight={handleRight}
				handleDown={handleDown}
				handleRotate={handleRotate}
			/>

			{!store.inGame && (
				<Modal handleStartGame={handleStartGame}>
					{store.isGameOver && <Points points={store.points} />}
				</Modal>
			)}
		</MainLayout>
	)
}

export default App
