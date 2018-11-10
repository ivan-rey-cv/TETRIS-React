import React, { useState } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import ActionsLayout from './layouts/ActionsLayout'
import GameGridLayout from './layouts/GameGridLayout'
import Grid from './components/Grid'
import Shape from './components/Shape'

import setGrid from './utils/setGrid'

const defaultGrid = setGrid(20, 15)
const defaultShape = setGrid(20, 15)
const defaultPos = { x: 7, y: 1 }

function App(props) {
	const [grid, setGrid] = useState(defaultGrid)
	const [shape, setShape] = useState(defaultShape)
	const [pos, setPos] = useState(defaultPos)

	return (
		<MainLayout>
			<HeaderLayout>
				<span>next "L"</span>
				<span>300 points</span>
			</HeaderLayout>

			<GameGridLayout>
				<Grid grid={grid} />
				<Shape shape={shape} pos={pos} />
			</GameGridLayout>

			<ActionsLayout>
				<span>left</span>
				<span>down</span>
				<span>drop</span>
				<span>right</span>
				<span>turn</span>
			</ActionsLayout>
		</MainLayout>
	)
}

export default App
