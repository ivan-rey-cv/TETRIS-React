import React, { useReducer, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import GameGridLayout from './layouts/CanvasLayout'
import GameActions from './components/GameActions'
import Modal from './components/Modal'
import Points from './components/Points'
import Next from './components/Next'

import gameReducer from './gameReducer'
import setDefaultState from './setDefaultState'
import { SQ, COLS, ROWS } from './utils/variables'

const defaultState = setDefaultState()

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
		/*
			function is re-declared everytime store.pos_y changes,
				but it removes the bug wherein you keeping the left/right keys and collides
				the tetromino stays on the same spot and postpones going down
		*/
		e => {
			if (store.ctx && store.inGame) {
				let delay = 600
				let timer = setTimeout(() => {
					dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
				}, delay)
				return () => {
					clearTimeout(timer)
				}
			}
		},
		[store.pos_y]
	)

	const handleKeyPress = useCallback(e => {
		switch (e.code) {
			case 'ArrowLeft': {
				return dispatch({ type: 'MOVE', newPos_x: -1, newPos_y: 0 })
			}
			case 'ArrowUp': {
				return dispatch({ type: 'ROTATE' })
			}
			case 'ArrowDown': {
				return dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
			}
			case 'ArrowRight': {
				return dispatch({ type: 'MOVE', newPos_x: 1, newPos_y: 0 })
			}
			default:
				return
		}
	}, [])

	useEffect(e => {
		if (store.ctx && store.inGame) {
			window.addEventListener('keydown', handleKeyPress)
			return () => {
				window.removeEventListener('keydown', handleKeyPress)
			}
		}
	})

	const handleStartGame = useCallback(e => {
		dispatch({ type: 'START_GAME' })
		// start moving down
		setTimeout(() => {
			dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
		}, 500)
	}, [])
	const handleRotate = useCallback(e => {
		dispatch({ type: 'ROTATE' })
	}, [])
	const handleLeft = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: -1, newPos_y: 0 })
	}, [])
	const handleRight = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 1, newPos_y: 0 })
	}, [])
	const handleDown = useCallback(e => {
		dispatch({ type: 'MOVE', newPos_x: 0, newPos_y: 1 })
	}, [])

	return (
		<MainLayout>
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
				<Modal
					handleStartGame={handleStartGame}
					isGameOver={store.isGameOver}
					points={store.points}
				/>
			)}
		</MainLayout>
	)
}

export default App
