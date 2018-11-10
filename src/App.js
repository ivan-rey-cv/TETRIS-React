import React, { useState } from 'react'

import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import GameGrid from './components/GameGrid'
import ActionsLayout from './layouts/ActionsLayout'

import setGrid from './utils/setGrid'

const defaultGrid = setGrid(20, 15)

function App(props) {
	const [grid, setGrid] = useState(defaultGrid)

	return (
		<MainLayout>
			<HeaderLayout>
				<span>next "L"</span>
				<span>300 points</span>
			</HeaderLayout>

			<GameGrid grid={grid} />

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
