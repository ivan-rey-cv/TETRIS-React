import React, { useState, useEffect, useCallback } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/GameGridLayout'
import Grid from './components/Grid'
import Shape from './components/Shape'

import setGrid from './utils/setGrid'
import setShape from './utils/setShape'

// will not be hoisted inside function
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

	useEffect(
		__ => {
			setTimeout(_ => {
				setPos({ x: pos.x, y: pos.y + 1 })
			}, 750)
			//
		},
		[pos]
	)

	const handleTurn = useCallback(e => {
		let shapeGrid = currentShape.grid
		let newShape = {
			...currentShape,
			grid: [
				[shapeGrid[2][0], shapeGrid[1][0], shapeGrid[0][0]],
				[shapeGrid[2][1], shapeGrid[1][1], shapeGrid[0][1]],
				[shapeGrid[2][2], shapeGrid[1][2], shapeGrid[0][2]]
			]
		}
		setCurrentShape(newShape)
	})

	console.log({ grid })
	return (
		<MainLayout>
			<HeaderLayout>
				<span>next "L"</span>
				<span>300 points</span>
			</HeaderLayout>

			<GameGridLayout>
				<Grid grid={grid} />
				<Shape shape={currentShape.grid} pos={pos} />
			</GameGridLayout>

			<ActionsLayout>
				<span>left</span>
				<span>down</span>
				<span>drop</span>
				<span>right</span>
				<span onClick={handleTurn}>turn</span>
			</ActionsLayout>
		</MainLayout>
	)
}

export default App
