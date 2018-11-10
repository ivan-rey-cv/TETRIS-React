import React from 'react'
import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import GameGridLayout from './layouts/GameGridLayout'
import ActionsLayout from './layouts/ActionsLayout'

function App(props) {
	return (
		<MainLayout>
			<HeaderLayout>
				<span>next "L"</span>
				<span>300 points</span>
			</HeaderLayout>

			<GameGridLayout>
				<span />
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
