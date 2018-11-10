import React, { useState, useEffect, useCallback } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/GameGridLayout'
import Grid from './components/Grid'
import Shape from './components/Shape'

import setGrid from './utils/setGrid'
import setShape from './utils/setShape'
import { setInterval } from 'core-js'

// imported functions will not be hoisted inside function declaration
// set before calling App function
const defaultGrid = setGrid(20, 15)
const defaultPos = { x: 7, y: 1 }
const shape_1 = setShape()
const shape_2 = setShape()

function App(props) {
	const [grid, setGrid] = useState(defaultGrid)
	const [currentShape, setCurrentShape] = useState(shape_1)
	const [nextShape, setNextShape] = useState(shape_2)
	const [pos, setPos] = useState(defaultPos)

	const checkCollision = useCallback(__ => {
		// if bottom shape's array has no <color>, take the middle array instead
		let hasEmptyBottomArr = currentShape.grid[2].every(x => x === '')
		let rowIndex = hasEmptyBottomArr ? pos.y + 1 : pos.y + 2,
			shapeArr,
			gridArr
		let lastIndex = 20

		if (hasEmptyBottomArr) {
			let index = 1
			shapeArr = currentShape.grid[index]
			gridArr = grid[pos.y + index]

			if (pos.y + index === lastIndex) {
				return true
			}
		} else {
			let index = 2
			shapeArr = currentShape.grid[index]
			gridArr = grid[pos.y + index]

			if (pos.y + index === lastIndex) {
				return true
			}
		}

		return shapeArr.reduce((hasCollision, item, index) => {
			if (hasCollision) return hasCollision

			return item && gridArr[pos.x - 1 + index] ? true : false
		}, false)
	})

	const descendShape = useCallback(__ => {
		// *bug/feature* - turning left/right refreshes setTimeout
		let timer
		let hasCollided = checkCollision()
		if (hasCollided) {
			return // do nothing
		} else {
			timer = setTimeout(_ => {
				setPos({ ...pos, y: pos.y + 1 })
			}, 750)
			return () => {
				clearTimeout(timer)
			}
		}
	})
	useEffect(descendShape)

	const handleRotate = useCallback(e => {
		console.log('handleRotate', 'should only rendered once')
		if (currentShape.name === 'O') {
			// box shape
			return // do nothing
		}

		let shapeGrid = currentShape.grid
		let newShape = {
			...currentShape,
			// turning the grid
			// there is a pattern, as you can see below
			grid: [
				[shapeGrid[2][0], shapeGrid[1][0], shapeGrid[0][0]],
				[shapeGrid[2][1], shapeGrid[1][1], shapeGrid[0][1]],
				[shapeGrid[2][2], shapeGrid[1][2], shapeGrid[0][2]]
			]
		}
		setCurrentShape(newShape)
	})

	const handleTurnRight = useCallback(e => {
		setPos({ ...pos, x: pos.x + 1 })
	})
	const handleTurnLeft = useCallback(e => {
		setPos({ ...pos, x: pos.x - 1 })
	})

	return (
		<MainLayout>
			<HeaderLayout>
				<span>
					<span>next</span>
					<span> "{nextShape.name}"</span>
				</span>
				<span>300 points</span>
			</HeaderLayout>

			<GameGridLayout>
				<Grid grid={grid} />
				{pos && <Shape shape={currentShape.grid} pos={pos} />}
			</GameGridLayout>

			<ActionsLayout>
				<span onClick={handleTurnLeft}>left</span>
				<span>drop</span>
				<span onClick={handleTurnRight}>right</span>
				<span onClick={handleRotate}>rotate</span>
			</ActionsLayout>
		</MainLayout>
	)
}

export default App
