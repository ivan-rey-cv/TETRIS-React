import React, { useReducer, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/CanvasLayout'

import gameReducer from './gameReducer'
import setMatrix from './utils/setMatrix'
import { SQ, COLS, ROWS } from './utils/variables'
import randomTetromino from './utils/randomTetromino'

const defaultState = {
	points: 0,
	ctx: null,
	pos_x: 0,
	pos_y: 0,
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

	useEffect(
		e => {
			if (store.ctx) {
				let timer = setInterval(() => {
					dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
				}, 750)
				return () => {
					clearTimeout(timer)
				}
			}
		},
		// remove this to work
		[store.pos_y]
	)

	const handleRotation = useCallback(e => {
		dispatch({ type: 'ROTATE' })
	})
	const handleTurnLeft = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: -1, newPos_y: 0 })
	})
	const handleTurnRight = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 1, newPos_y: 0 })
	})
	const handleDown = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
	})

	return (
		<MainLayout>
			<HeaderLayout>
				<span>
					<span>next</span>
					<span> "{store.nextTetromino.name}"</span>
				</span>
				<span>{store.points} points</span>
			</HeaderLayout>

			<GameGridLayout>
				<canvas
					ref={e => (canvas = e)}
					height={ROWS * SQ}
					width={COLS * SQ}
				/>
			</GameGridLayout>

			<ActionsLayout>
				<span onClick={handleTurnLeft}>left</span>
				<span onClick={handleDown}>down</span>
				<span onClick={handleTurnRight}>right</span>
				<span onClick={handleRotation}>rotate</span>
			</ActionsLayout>
		</MainLayout>
	)
}

export default App
