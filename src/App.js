import React, { useReducer, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import GameGridLayout from './layouts/CanvasLayout'
import GameActions from './components/GameActions'
import Points from './components/Points'
import Next from './components/Next'

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

	const handleArrowkeys = useCallback(e => {
		// todo: handle arrow keys
		console.log(e)
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
		</MainLayout>
	)
}

export default App
