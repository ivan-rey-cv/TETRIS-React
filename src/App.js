import React, { useState, useEffect, useCallback, useRef } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/CanvasLayout'

import setMatrix from './utils/setMatrix'
import setTetromino from './utils/setTetromino'
import renderTetromino from './utils/renderTetromino'
import drawMatrix from './utils/drawMatrix'

// imported functions (like var, let const) will be hoisted after function declaration
// set before calling App function
const defaultMatrix = setMatrix(20, 15)
const length = 20
const defaultPos = { x: 6, y: 1 }
const tetromino_1 = setTetromino()
const tetromino_2 = setTetromino()

function App(props) {
	const [matrix, setMatrix] = useState(defaultMatrix)
	const [currentTetromino, setCurrentTetromino] = useState(tetromino_1)
	const [nextTetromino, setNextTetromino] = useState(tetromino_2)
	const [pos, setPos] = useState(defaultPos)
	const [ctx, setCtx] = useState(null)
	let canvas = useRef(null)

	const checkCollision = useCallback(newPos => {
		let hasCollision = currentTetromino.matrix.reduce(
			(hasCollided, row, rowIndex) => {
				if (hasCollided) {
					return hasCollided
				}
				row.forEach((cell, cellIndex) => {
					if (cell === 1) {
						let matrixRow = newPos.y + rowIndex
						let matrixCol = newPos.x + cellIndex
						let outOfBounds =
							matrixRow > 19 || matrixCol < 0 || matrixCol > 14

						if (outOfBounds) {
							console.log({ matrixCol, outOfBounds })
							return (hasCollided = true)
						} else {
							let matrixCell = matrix[matrixRow][matrixCol]
							// has collided if matrixCell contains color string
							return (hasCollided = matrixCell ? true : false)
						}
					}
				})
				return hasCollided
			},
			false
		)
		return hasCollision
	})

	const moveTetromino = useCallback((newX, newY) => {
		let newPos = { x: pos.x + newX, y: pos.y + newY }
		let hasCollision = checkCollision(newPos)
		if (hasCollision) {
			// do nothing
		} else {
			renderTetromino(
				'clear',
				ctx,
				currentTetromino,
				pos.x * length,
				pos.y * length
			)
			renderTetromino(
				'draw',
				ctx,
				currentTetromino,
				newPos.x * length,
				newPos.y * length
			)
			return setPos(newPos)
		}

		return //
	})

	useEffect(
		e => {
			if (canvas && !ctx) {
				console.log('initialize matrix...')
				let newCtx = canvas.getContext('2d')
				setCtx(newCtx)
				drawMatrix(newCtx, matrix, 0, 0)
			}
		},
		[matrix]
	)

	useEffect(
		e => {
			if (ctx) {
				let timer = setTimeout(_ => {
					moveTetromino(0, 1)
				}, 750)
				return () => {
					clearTimeout(timer)
				}
			}
		}
		//[pos]
	)

	const handleRotation = useCallback(e => {
		renderTetromino(
			'clear',
			ctx,
			currentTetromino,
			pos.x * length,
			pos.y * length
		)
		setCurrentTetromino(currentTetromino.rotate())
	})
	const handleTurnRight = useCallback(e => {
		moveTetromino(1, 0)
	})
	const handleTurnLeft = useCallback(e => {
		moveTetromino(-1, 0)
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
				<canvas ref={e => (canvas = e)} height="400" width="300" />
			</GameGridLayout>

			<ActionsLayout>
				<span onClick={handleTurnLeft}>left</span>
				<span>drop</span>
				<span onClick={handleTurnRight}>right</span>
				<span onClick={handleRotation}>rotate</span>
			</ActionsLayout>
		</MainLayout>
	)
}

export default App
