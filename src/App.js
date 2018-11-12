import React, { useState, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/CanvasLayout'

import setMatrix from './utils/setMatrix'
import createList from './utils/createList'
import paintMatrix from './utils/paintMatrix'
import { SQ, COLS, ROWS } from './utils/variables'
import randomTetromino from './utils/randomTetromino'

// imported functions (like var, let const) will be hoisted after function declaration
// set before calling App function
const defaultMatrix = setMatrix(ROWS, COLS)
const tetromino_1 = randomTetromino()
const tetromino_2 = randomTetromino()

function App(props) {
	const [board, setBoard] = useState(defaultMatrix)
	const [currentTetromino, setCurrentTetromino] = useState(tetromino_1)
	const [nextTetromino, setNextTetromino] = useState(tetromino_2)
	const [ctx, setCtx] = useState(null)
	let canvas = useRef(null)

	useEffect(
		e => {
			if (canvas) {
				console.log('initialize matrix...')
				let newCtx = canvas.getContext('2d')
				setCtx(newCtx)
				paintMatrix('drawBoard', newCtx, board, 0, 0)
			}
		},
		[board]
	)

	const lockTetrominoToBoard = useCallback(() => {
		let pos_x = currentTetromino.pos_x
		let pos_y = currentTetromino.pos_y
		currentTetromino.matrix.forEach((row, rowIndex) => {
			row.forEach((cellItem, cellIndex) => {
				if (cellItem === 1) {
					// mutate board
					// board's cell as currentTetromino.color
					board[pos_y + rowIndex][pos_x + cellIndex] =
						currentTetromino.color
				}
			})
		})
	})

	const removeFilledRows = useCallback(() => {
		const filteredBoard = board.filter(row => row.every(cell => cell))
		let count = board.length - filteredBoard.length
		if (count > 0) {
			let emptyLists = []
			for (let i = 0; i < count; i++) {
				let list = createList(COLS, '')
				emptyLists.push(list)
			}
			setBoard([...emptyLists, ...filteredBoard])
		} else {
			setBoard(board)
		}
		//
	})

	useEffect(
		e => {
			if (ctx) {
				currentTetromino.paint('draw', ctx)
				console.log('set interval')
				setBoard(board)
				let timer = setInterval(_ => {
					let hasCollided = currentTetromino.down(ctx, board)

					if (hasCollided) {
						lockTetrominoToBoard()
						removeFilledRows()
						setCurrentTetromino(nextTetromino)
						setNextTetromino(randomTetromino())
					}
				}, 750)
				return () => {
					clearTimeout(timer)
				}
			}
		},
		[board, ctx]
	)

	const handleRotation = useCallback(e => {
		currentTetromino.rotate(ctx, board)
	})

	const handleTurnLeft = useCallback(e => {
		currentTetromino.move(-1, 0, ctx, board)
	})
	const handleTurnRight = useCallback(e => {
		currentTetromino.move(1, 0, ctx, board)
	})
	const handleDown = useCallback(e => {
		currentTetromino.move(0, 1, ctx, board)
	})

	return (
		<MainLayout>
			<HeaderLayout>
				<span>
					<span>next</span>
					<span> "{nextTetromino.name}"</span>
				</span>
				<span>300 points</span>
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
